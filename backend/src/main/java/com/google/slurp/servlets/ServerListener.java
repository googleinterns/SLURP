package com.google.slurp.servlets;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import java.io.IOException;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 * Servlet context listener that is looked for whenever the backend server
 * receives a startup or shutdown request.
 */
@WebListener
public class ServerListener implements ServletContextListener {
  public FirebaseApp app;

  /**
   * {@inheritDoc}
   *
   * Initialize the Firebase Admin app for the server.
   */
  @Override
  public void contextInitialized(ServletContextEvent event) {
    System.out.println("Server initialized and starting up...");

    try {
      FirebaseOptions options = new FirebaseOptions.Builder()
                                    .setCredentials(GoogleCredentials.getApplicationDefault())
                                    .build();

      app = FirebaseApp.initializeApp(options);
    } catch (IOException error) {
      System.err.println("Error obtaining the Application Default Credentials:");
      error.printStackTrace();
    }
  }

  /**
   * {@inheritDoc}
   *
   * Delete the Firebase Admin app.
   */
  @Override
  public void contextDestroyed(ServletContextEvent event) {
    System.out.println("Server destroyed and shutting down...");

    app.delete();
  }
}
