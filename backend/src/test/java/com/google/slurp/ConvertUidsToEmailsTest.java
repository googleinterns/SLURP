package com.google.slurp;

import com.google.slurp.servlets.ConvertUidsToEmailsServlet;
import com.google.slurp.servlets.ServerListener;
import java.io.BufferedReader;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;
import javax.servlet.ServletContextEvent;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.mockito.Mockito;

/** */
@RunWith(JUnit4.class)
public class ConvertUidsToEmailsTest extends Mockito {
  // These are the test accounts registered with Firebase Authentication, with some fake users.
  private static final String USER_1_UID = "\"Eq00IcXeNbfwgL8ZAIHw4Alp9i53\"";
  private static final String USER_2_UID = "\"IjtXS7Py9ZeorDRPmsY52RBWhop1\"";
  private static final String USER_1_EMAIL = "\"step2020.53.test1@gmail.com\"";
  private static final String USER_2_EMAIL = "\"step2020.53.test2@gmail.com\"";
  private static final String USER_FAKE1_UID = "\"totally_legit_uid\"";
  private static final String USER_FAKE2_UID = "\"super_cool_dude\"";

  // Lists of UIDs and expected lists of emails, constructed from the test users.
  private static final String TWO_UIDS_LIST = String.format("[%s,%s]\n", USER_1_UID, USER_2_UID);
  private static final String ONE_UID_LIST = String.format("[%s]\n", USER_1_UID);
  private static final String EMPTY_UID_LIST = "[]\n";
  private static final String UID_LIST_WITH_FAKE =
      String.format("[%s,%s]\n", USER_1_UID, USER_FAKE1_UID);
  private static final String ALL_FAKE_USERS =
      String.format("[%s,%s]\n", USER_FAKE1_UID, USER_FAKE2_UID);
  private static final String TWO_EMAILS_LIST =
      String.format("[%s,%s]\n", USER_1_EMAIL, USER_2_EMAIL);
  private static final String EMPTY_EMAIL_LIST = "[]\n";
  private static final String ONE_EMAIL_LIST = String.format("[%s]\n", USER_1_EMAIL);

  private static ServerListener mockServer;
  private static ServletContextEvent event;
  private ConvertUidsToEmailsServlet servlet;
  private HttpServletRequest request;
  private HttpServletResponse response;

  /**
   * Given a JSON array of UIDs, check that the servlet's doPost function writes to the response a
   * JSON array of the expected emails. Uses mocked request and response variables.
   *
   * @param uidList The JSON array of UIDs we wish to convert.
   * @param emailList The expected JSON array of emails from the given uidList.
   * @throws Exception When either the doPost or the asssertEquals fails.
   */
  private void assertUidsConvertedToEmails(String uidList, String emailList) throws Exception {
    BufferedReader readerFromString = new BufferedReader(new StringReader(uidList));
    when(request.getReader()).thenReturn(readerFromString);

    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);

    servlet.doPost(request, response);

    writer.flush();
    Assert.assertEquals(emailList, stringWriter.toString());
  }

  @BeforeClass
  public static void setUpFirebaseAdmin() {
    mockServer = new ServerListener();
    event = mock(ServletContextEvent.class);
    mockServer.contextInitialized(event);
  }

  @AfterClass
  public static void shutDownFirebaseAdmin() {
    mockServer.contextDestroyed(event);
  }

  @Before
  public void setUpServlet() {
    servlet = new ConvertUidsToEmailsServlet();
    request = mock(HttpServletRequest.class);
    response = mock(HttpServletResponse.class);
  }

  /**
   * Given two legitimate user UIDs, return the corresponding user emails.
   */
  @Test
  public void retrieveTwoUserEmails() throws Exception {
    assertUidsConvertedToEmails(TWO_UIDS_LIST, TWO_EMAILS_LIST);
  }

  /**
   * Given one legitimate user UID, return the corresponding user email.
   */
  @Test
  public void retrieveOneUserEmail() throws Exception {
    assertUidsConvertedToEmails(ONE_UID_LIST, ONE_EMAIL_LIST);
  }

  /**
   * Given an empty request, return an empty response.
   */
  @Test
  public void emptyRequest() throws Exception {
    assertUidsConvertedToEmails(EMPTY_UID_LIST, EMPTY_EMAIL_LIST);
  }

  /**
   * Given a request consisting of one legitimate user and one fake user, return only the email of
   * the legitimate user.
   */
  @Test
  public void requestWithFakeUser() throws Exception {
    assertUidsConvertedToEmails(UID_LIST_WITH_FAKE, ONE_EMAIL_LIST);
  }

  /**
   * Given a request consisting of all fake users, return an empty response.
   */
  @Test
  public void requestAllFakeUsers() throws Exception {
    assertUidsConvertedToEmails(ALL_FAKE_USERS, EMPTY_EMAIL_LIST);
  }
}
