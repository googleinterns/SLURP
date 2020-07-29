package com.google.slurp;

import com.google.slurp.servlets.ConvertEmailsToUidsServlet;
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
public class ConvertEmailsToUidsTest extends Mockito {
  // These are the test accounts registered with Firebase Authentication.
  private static final String USER_1_EMAIL = "\"step2020.53.test1@gmail.com\"";
  private static final String USER_2_EMAIL = "\"step2020.53.test2@gmail.com\"";
  private static final String USER_1_UID = "\"Eq00IcXeNbfwgL8ZAIHw4Alp9i53\"";
  private static final String USER_2_UID = "\"IjtXS7Py9ZeorDRPmsY52RBWhop1\"";

  // Lists of emails and expected lists of UIDs, constructed from the test users.
  private static final String TWO_EMAILS_LIST =
      String.format("[%s,%s]\n", USER_1_EMAIL, USER_2_EMAIL);
  private static final String ONE_EMAIL_LIST = String.format("[%s]\n", USER_1_EMAIL);
  private static final String EMPTY_EMAIL_LIST = "[]\n";
  private static final String TWO_UIDS_LIST = String.format("[%s,%s]\n", USER_1_UID, USER_2_UID);
  private static final String ONE_UID_LIST = String.format("[%s]\n", USER_1_UID);
  private static final String EMPTY_UID_LIST = "[]\n";

  private static ServerListener mockServer;
  private static ServletContextEvent event;
  private ConvertEmailsToUidsServlet servlet;
  private HttpServletRequest request;
  private HttpServletResponse response;

  /**
   * Given a JSON array of emails, check that the servlet's doPost function writes to the response
   * a JSON array of the expected UIDs. Uses mocked request and response variables.
   *
   * @param emailList The JSON array of emails we wish to convert.
   * @param uidList The expected JSON array of UIDs from the given emailList.
   * @throws Exception When either the doPost or the asssertEquals fails.
   */
  private void assertEmailsConvertedToUids(String emailList, String uidList) throws Exception {
    BufferedReader readerFromString = new BufferedReader(new StringReader(emailList));
    when(request.getReader()).thenReturn(readerFromString);

    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);

    servlet.doPost(request, response);

    writer.flush();
    Assert.assertEquals(uidList, stringWriter.toString());
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
    servlet = new ConvertEmailsToUidsServlet();
    request = mock(HttpServletRequest.class);
    response = mock(HttpServletResponse.class);
  }

  /**
   * Given two legitimate user emails, return the corresponding user UIDs.
   */
  @Test
  public void retrieveTwoUserUIDs() throws Exception {
    assertEmailsConvertedToUids(TWO_EMAILS_LIST, TWO_UIDS_LIST);
  }

  /**
   * Given one legitimate user email, return the corresponding user UID.
   */
  @Test
  public void retrieveOneUserUID() throws Exception {
    assertEmailsConvertedToUids(ONE_EMAIL_LIST, ONE_UID_LIST);
  }

  /**
   * Given an empty request, return an empty response.
   */
  @Test
  public void emptyRequest() throws Exception {
    assertEmailsConvertedToUids(EMPTY_EMAIL_LIST, EMPTY_UID_LIST);
  }
}
