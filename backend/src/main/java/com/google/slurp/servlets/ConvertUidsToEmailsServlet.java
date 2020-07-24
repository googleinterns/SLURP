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
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.GetUsersResult;
import com.google.firebase.auth.UidIdentifier;
import com.google.firebase.auth.UserIdentifier;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

/**
 * Servlet that converts a given POST request of user UIDs to the corresponding
 * user emails, sending this back as the response.
 */
@WebServlet("/api/v1/convert-uids-to-emails")
public class ConvertUidsToEmailsServlet extends HttpServlet {
  private FirebaseAuth auth = FirebaseAuth.getInstance();

  /**
   * Constructs a list of <code>UserIdentifier</code> using the given JSON array supplied by the
   * POST request.
   *
   * @param json The body of the POST request, expected to be a String array of user UIDs.
   * @return A list of UserIdentifier objects identified by user UID. Can then be used in a
   * <code>FirebaseAuth</code> instance's <code>getUsers</code> or <code>getUsersAsync</code>
   * functions.
   */
  private List<UserIdentifier> getUserIdentifiers(Reader json) {
    Type typeOfListString = new TypeToken<List<String>>(){}.getType();
    List<String> userUids = new Gson().fromJson(json, typeOfListString);
    return userUids.stream()
                   .map(uid -> new UidIdentifier(uid))
                   .collect(Collectors.toList());
  }

  /**
   * {@inheritDoc}
   *
   * Given a JSON array of user UIDs, sends back to the response a JSON array of the corresponding
   * user emails in alphabetical order. On error, sends an empty response.
   */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    List<UserIdentifier> userIdentifiers = getUserIdentifiers(request.getReader());

    // Attempt to obtain the requested users from Firebase using the given UIDs.
    GetUsersResult result;
    try {
      result = auth.getUsersAsync(userIdentifiers)
                   .get();
    } catch (InterruptedException | ExecutionException error) {
      System.err.println("Error when asynchronously getting users:");
      error.printStackTrace();
      return;
    }
    List<String> userEmails = result.getUsers()
                                    .stream()
                                    .map(user -> user.getEmail())
                                    .sorted()
                                    .collect(Collectors.toList());

    response.setContentType("application/json");
    response.getWriter().println(new Gson().toJson(userEmails));
  }
}
