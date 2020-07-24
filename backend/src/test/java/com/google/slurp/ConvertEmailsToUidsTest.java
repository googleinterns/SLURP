package com.google.slurp;

import java.io.BufferedReader;
import java.io.PrintWriter;
import java.io.StringReader;
import java.io.StringWriter;

import javax.servlet.ServletContextEvent;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.slurp.servlets.ConvertEmailsToUidsServlet;
import com.google.slurp.servlets.ServerListener;

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

  private static final String TWO_EMAILS_LIST =
      String.format("[%s,%s]\n", USER_1_EMAIL, USER_2_EMAIL);
  private static final String EMPTY_EMAIL_LIST = "[]\n";
  private static final String TWO_UIDS_LIST = String.format("[%s,%s]\n", USER_1_UID, USER_2_UID);
  private static final String EMPTY_UID_LIST = "[]\n";

  private static ServerListener mockServer;
  private static ServletContextEvent event;
  private ConvertEmailsToUidsServlet servlet;
  private HttpServletRequest request;
  private HttpServletResponse response;

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
    BufferedReader readerFromString = new BufferedReader(new StringReader(TWO_EMAILS_LIST));
    when(request.getReader()).thenReturn(readerFromString);

    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);

    servlet.doPost(request, response);

    writer.flush();
    Assert.assertEquals(TWO_UIDS_LIST, stringWriter.toString());
  }

  /**
   * Given an empty request, return an empty response.
   */
  @Test
  public void emptyRequest() throws Exception {
    BufferedReader readerFromString = new BufferedReader(new StringReader(EMPTY_EMAIL_LIST));
    when(request.getReader()).thenReturn(readerFromString);

    StringWriter stringWriter = new StringWriter();
    PrintWriter writer = new PrintWriter(stringWriter);
    when(response.getWriter()).thenReturn(writer);

    servlet.doPost(request, response);

    writer.flush();
    Assert.assertEquals(EMPTY_UID_LIST, stringWriter.toString());
  }
}
