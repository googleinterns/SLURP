// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.slurp.servlets;

import java.io.IOException;
import java.io.Reader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.firebase.auth.EmailIdentifier;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.GetUsersResult;
import com.google.firebase.auth.UserIdentifier;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.UserRecord.CreateRequest;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.apache.commons.lang3.StringUtils;

/**
 * Servlet that converts a given POST request of user emails to the
 * corresponding user UIDs, sending this back as the response.
 */
@WebServlet("/api/v1/convert-emails-to-uids")
public class ConvertEmailsToUidsServlet extends HttpServlet {
  private FirebaseAuth auth = FirebaseAuth.getInstance();

  /**
   * Constructs a list of <code>UserIdentifier</code> using the given JSON array
   * supplied by the POST request.
   *
   * @param json The body of the POST request, expected to be a String array of
   *             user emails.
   * @return A list of UserIdentifier objects identified by user email. Can then
   *         be used in a <code>FirebaseAuth</code> instance's
   *         <code>getUsers</code> or <code>getUsersAsync</code> functions.
   */
  private List<UserIdentifier> getUserIdentifiers(Reader json) {
    Type typeOfListString = new TypeToken<List<String>>() {
    }.getType();
    List<String> userEmails = new Gson().fromJson(json, typeOfListString);
    return userEmails.stream().map(email -> new EmailIdentifier(email)).collect(Collectors.toList());
  }

  /**
   * Given a list of emails that are not yet associated with a user, create user accounts for each
   * of them and return the corresponding list of Firebase-generated user UIDs.
   *
   * @param emails The list of emails to create users for in Firebase Auth.
   * @return The list of Firebase-generated user UIDs from the created users.
   * @throws FirebaseAuthException If an error occurs when creating a user.
   */
  private List<String> createUsersAndGetUids(List<String> emails) throws FirebaseAuthException {
    List<CreateRequest> requests = emails.stream()
                                         .map(email -> new CreateRequest().setEmail(email))
                                         .collect(Collectors.toList());

    List<String> generatedUids = new ArrayList<String>();
    for (CreateRequest request : requests) {
      UserRecord userRecord = auth.createUser(request);
      generatedUids.add(userRecord.getUid());
    }

    return generatedUids;
  }

  /**
   * {@inheritDoc}
   *
   * Given a JSON array of user emails, sends back to the response a JSON array of the corresponding
   * user UIDs. For any given email that is not yet associated with a user, a new account is created
   * with that email and the generated UID is returned with the rest of the UIDs. On error, sends an
   * empty response.
   */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    List<UserIdentifier> userIdentifiers = getUserIdentifiers(request.getReader());

    // Attempt to obtain the requested users from Firebase using the given emails.
    GetUsersResult result;
    try {
      result = auth.getUsersAsync(userIdentifiers)
                   .get();
    } catch (InterruptedException | ExecutionException error) {
      System.err.println("Error when asynchronously getting users:");
      error.printStackTrace();
      return;
    }
    List<String> userUids = result.getUsers()
                                  .stream()
                                  .map(user -> user.getUid())
                                  .collect(Collectors.toList());

    // Handle the emails not found in the database by creating new user accounts for them and
    // obtaining the generated UIDs.
    List<String> remainingEmails = result.getNotFound()
                                         .stream()
                                         .map(user ->
                                           StringUtils.substringBetween(user.toString(), "(", ")")
                                         )
                                         .collect(Collectors.toList());
    List<String> remainingUids;
    try {
      remainingUids = createUsersAndGetUids(remainingEmails);
    } catch (FirebaseAuthException error) {
      System.err.println("Error creating new users:");
      error.printStackTrace();
      return;
    }
    
    List<String> uidsToReturn = Stream.concat(userUids.stream(), remainingUids.stream())
                                      .collect(Collectors.toList());
    response.setContentType("application/json");
    response.getWriter().println(new Gson().toJson(uidsToReturn));
  }
}
