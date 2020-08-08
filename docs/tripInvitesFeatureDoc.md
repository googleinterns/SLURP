# SLURP Trip Invites                                                Feature Doc


#### Parent Design Doc: [go/slurp-doc](https://docs.google.com/document/d/1ogEBq2Bssc6VrcoCO5gpw3v2dSc3Zd-f9Y4C6HNFLNg/)

#### Link: [go/slurp-trip-invites](https://docs.google.com/document/d/14ne4ZLJrYMpaX-LS08rYOD6a2r6A3NTZV1tmfb_AcTk)


#### Authors: zghera, keiffer


#### Reviewers: hiramj, longjuntan


# Objective

Improve the user journey by introducing explicit trip invitations backed by notifications.


# Motivation

In the MVP save trip modal, when collaborators are added to a trip upon creation or editing a trip, the user uid corresponding to the user’s email is added to the trip collaborators list. Upon sign in, the current user would be redirected to the view trips page where they can see all trips where they were added to the collaborator list.

There are a couple motivators for why a more robust trip invite system is desirable for users:



*   Users have no idea when they have been invited to a trip (current trip invitations are “silent”).
*   Users have no way to send feedback to other members of the trip about whether or not they want to join/participate.
*   Users are not protected against trip invitation spamming attacks.


# Requirements

MVP:



*   Users are notified when they have been added to a trip [via email](#bookmark=id.r4vfuglkvxng).
*   Users can accept or reject a trip once they have been “invited” by the owner or another collaborator. The view trips page will include a [trip view](#bookmark=id.fffbvo5j9dvp) selector that allows users to see and manage trips they have accepted (existing), trips they have been invited to, ad trips they have rejected.

Extension:



*   Users are also notified through [in-app notifications](#bookmark=id.pa5kcuuiljid).
*   Prevent [trip invite spamming](#bookmark=id.4vztg3vwloj0) by ensuring that user’s cannot be repeatedly invited to (a) trip(s).
*   Active trip members are also [notified](#bookmark=id.r4vfuglkvxng) when a user accepts or rejects a trip.


# Design


## Trip Views

When a user adds a new collaborator when creating or editing a trip, that trip appears on the view trips page for that collaborator. For the SLURP MVP, the view trips page was a singular page where all trips that contained the current user as a collaborator would be displayed.


### Frontend

With the addition of trip invites feature, the view trips page was “split” into three _views_ on the original page:



*   **Active**: Displays the users trips they have accepted or created. This is the default view when users log on to the application.
*   **Pending**: Displays any pending trips that the user has been invited to.
    *   The buttons to edit, delete, and view activities are disabled for these trips.

            This was done to enforce the design decision that only active collaborators should be able to make changes to the trip (edit, delete, view activities (where they can edit the activities)).

    *   Two additional buttons were added to accept or reject the invitation to collaborate on that trip.
*   **Rejected**: The final view that displays trips that the user has rejected
    *   The standard buttons to edit, delete, and view activities will be disabled for these trips (see why in pending section above).
    *   One button was added to accept a trip. This is done in case the user accidentally rejected a trip.



<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")


Fig. 1: Current “View Trips” Page on Pending View

The version of the UI can be seen in Fig. 1.


### Backend

In the backend, the primary change was to modify the current system to handle multiple collaborator fields for a trip document. Rather than a single collaborators uid array field in a trip document, a trip document was updated to contain three collaborator uid arrays: accepted, pending, and rejected collaborators. These arrays correspond to the trip views active, pending, and rejected, respectively. The user flows introduced in the Frontend section are handled by the following actions between the three new collaborator uid array fields:



*   When a trip creator adds the initial collaborators, each user will be placed in the pending array. The trip creator will be placed in the accepted array.
*   When editing a trip, any users that are not already contained in the accepted or rejected array will be added to the pending array.
*   Accepting and/or rejecting the trip from the pending or rejected views will remove the user from the current collaborator array and place them in the array corresponding to the desired action.
*   If a pending or accepted user is removed in the edit trip modal, they will be removed from the respective array (rejected users cannot be removed).

In an effort to simplify the addition and removals between the arrays, the arrays are converted to sets before performing the operations. Once modifications are made, the sets are converted back to arrays for storage in the database ([cannot store a set](https://firebase.google.com/docs/firestore/manage-data/data-types)).

As mentioned previously, users on a given trip that have rejected the invitation can no longer be invited to or removed from that trip. Thus, this implementation will ensure rejected users are protected against spam invites (on an individual trip they have rejected). Protection for accepted and pending users will be implemented in [trip invite spamming](#bookmark=id.4vztg3vwloj0).


## Email Notifications

On addition of a collaborator to a trip, we wish to send an email notification to the email that is given. The sender of the email is a noreply email address that solely sends email notifications to users. We make use of this using both the Gmail API and the OAuth2 authorization framework, to allow our app to completely take control of the noreply email address and send emails as needed. The specific process is as follows:



*   Using the quickstart code given in [https://developers.google.com/gmail/api/quickstart/java](https://developers.google.com/gmail/api/quickstart/java), we first authorize SLURP to take complete control of the noreply email address, allowing it to send emails to users on its behalf.
*   SLURP must constantly be authorized to use the noreply email address. By default, the authorization token only lasts for one hour before needing to be manually refreshed again. Since we wish this to be automated, we persist the access credentials using a custom implementation of the DataStoreFactory object, as listed [here](https://developers.google.com/api-client-library/java/google-api-java-client/oauth2#data_store). Specifically, this custom implementation makes use of our Firebase database to store the credentials. This allows our project to simply query our database when it needs the access token to use the Gmail API with our noreply email address.
*   Finally, with the Gmail service set up, the request to send an email is first triggered from the frontend of our application. Currently, we plan for this to happen when the user first logs in to our application and when a user is added as a collaborator for a trip. We make a fetch request to a servlet in our backend, which uses the created Gmail service to send the appropriate email to the relevant users.

Credit to tomatocat@ for help in understanding and setting up this system for sending email notifications.


## In-App Notifications

TODO(zghera): Complete if time permits for implementing this feature.


## Trip Invite Spam Protection

TODO(zghera): Complete if time permits for implementing this feature.

Potential Spam Cases:



*   If a user (pending or accepted) is removed from a trip, the originator of the removal can potentially spam the user with more invites/removals in succession.
*   A trip creator invites a single user to multiple trips in a short period of time in an attempt to spam them with notifications and a flooded pending trips page
