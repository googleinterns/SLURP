# Shared Live Universal Recreation Planner (SLURP)                                                  Design Doc


#### **Link**: [go/slurp-doc](https://docs.google.com/document/d/1ogEBq2Bssc6VrcoCO5gpw3v2dSc3Zd-f9Y4C6HNFLNg/)

**Application Link**: [go/slurp-app](https://step53-2020.appspot.com/)


#### **Authors**: ananyay, keiffer, zghera


#### **Reviewers**: hiramj, longjuntan


# Objective

Build an application that allows group travelers to collaborate and manage their shared itinerary for future trips in real time.


# Background

Before we begin, let’s define some terms:



*   _Trip_: A vacation or set of activities.
*   _Activity_: Anything that can happen during a trip, including driving, sleeping, eating, travel details, entertainment, etc.
*   _Collaborators_: The people who are planning the trip.


## Overview

This application is designed to help trip organizers and co-travelers collaborate and share ideas, therefore allowing each of the vacationers to have a voice in the trip’s activities and maximizing the experience altogether. Audiences for this application include groups that are interested in planning vacations, family reunions, weekend events, and everything in between. To build a product that will satisfy this purpose, we must create a clean, straightforward, intuitive, and customizable system that allows a group of travelers to collaborate on trip details in real time.


## Motivating Example

A group of college friends decide that they deserve a much-needed break and plan a trip to Florida! None of them had ever visited the state and designate one member of the group, Emma, to design the group’s itinerary. She creates a rudimentary outline of the trip plans, constantly prompting the others for what ideas they have and incorporating everyone’s suggestions into one document. This creates a feeling of seclusion between Emma and the rest of the group, as most only know bits and pieces of the entire group’s plans and Emma begins to feel some annoyance at continuously updating everyone. This doesn’t get any better by the start of the trip either. Even though Emma shared the finalized plan with everyone in a Google Doc, the group continues to ask Emma every few hours about what the next event will be, seeing her as the sole owner of the group’s itinerary.


## Current Situation

Often the planning of an itinerary is delegated to a subset of the entire group or initially created in an unorganized way, creating potential disorder in the communication of a group’s travel plans. But, [as stated by the KAYAK travel agency](https://www.kayak.com/news/10-rules-group-travel/), “planning a group trip can be a bit like herding cats”, as assembling and organizing the suggestions of the entire group can be a cluttered process.

Right now, the best way to collaboratively plan your trip would be to use Google Sheets or Google Docs. This project aims to make a product that provides tools more aligned with travel.


## Statistics

This section DNE

Statistics..??


# Requirements and Scale

Collaborators will be able to:



*   plan their routes, meals, hotel reservations, flights, and daily activities through their application, and
*   allow other travelers to add comments, change details, and see the day-to-day plan in a centralized place.


## Requirements

The Minimum Viable Product (MVP) for our application should accomplish the following:



*   Store the details of created trips as well as the details of all the activities associated with each trip.
*   Accommodate flexible data types to represent trips, activities, and users. Doing so will allow us to more easily implement features beyond the MVP.
*   Ensure that in every step of the web application, we authenticate the user to ensure that they are allowed to view the current web page they are on. This includes when they are viewing all the trips in which they are a collaborator and when they are editing a specific trip’s itinerary. This is to make sure that unauthorized edits are not made.

The essential requirements for our application following the completion of the MVP are as follows:



*   Keep all users’ trips and activity viewer pages updated with the data from the most recent snapshot of the database.
*   Integrate the application with Google Calendar. More specifically, whenever trip details are added/ updated, a calendar event will be created/ updated and invite all of the collaborators on the trip to attend.
*   Generate shareable trip maps and driving routes between activities.


## Scalability Considerations

In the case where we end up expanding our user base, we will need to find a reasonable way to accommodate high volumes of site traffic. Additionally, we will need to account for the total frequency of read/write operations and/or the number of operations per second/minute/etc. The  type of database and the structure of data within the database should be chosen carefully to minimize the read/write operations as mentioned above.


## Extensions

There are many potential features that can be integrated into this project. The list of essential features that are not included in the MVP are mentioned in the requirements sections above. Additional features that are neither part of the MVP nor are considered essential are listed below:



*   CSS dropdown trip lists, trips as button cards
*   To-Do lists (“set reservation for dinner”) and reminders (“bring swimsuit and towel”)
*   Search
    *   Search bar on trips page that will search through a users current trips and recurse into the activities.
    *   Need to do more research to see what libraries are available when it comes to making these aspects easier:
        *   Matching search results with text in a single document
        *   Accessing/searching fields across multiple documents simultaneously? (firestore)
*   Pending trip invite → Notifications to accept a trip you are invited to.
    *   You can look at these pending trips and accept or reject.
    *   Owner/admins will get a notification that you accepted or rejected.
    *   Also want to think about not allowing a user to be spammed with invites from someone else. Initially can start with a simple system that does not allow more than 5 trip invites within a minute or something.
*   Multiple user access levels (e.g. Owners, admins, partial-edit, view-only, etc) for trips.
*   Sorting trips based on different fields (e.g. most recently updated -- need to work with activity page).
*   Give a warning if events are overlapping.
*   Recommended events given location.
*   Events that we’re thinking about (voting).
*   Accessibility.
*   Keep track of # adults, # children (Associate with attendees).
*   Busy-ness to determine when to schedule things.
*   Earth weather forecast for each day ([api](https://openweathermap.org/api), check license).
*   Mars weather easter egg.
*   Use imdb api to give movie scene locations.
*   Recommendations from presentations
    *   View Trips Page
        *   Aligning the edit, delete, activity buttons better within the card. Either move to the top or align with the left item rows.
        *   When creating a trip, being able to get recommendations (autofill with name or a dropdown of name/avatars) for past people you’ve gone on a trip with
        *   Show user name (or even better, their account pictures) rather than email on the view trips page
    *   View Activities Page
        *   Assigning people to activites/info. Words from suekyungkim@:
            *   on the activities page, maybe next to the 'Add' button, there can be avatars of the trip collaborators so whenever there are individual flights/hotels/etc to add, people can quickly tap on their own avatar and start adding their own reservations (i.e. if I want to add my flight details to the itinerary so the rest of the group can know when/how I'm arriving to the destination
            *   it would be really cool if using the avatars on each item in the itinerary, everyone can see WHO the reservation is for/who is attending
            *   ie. if it's an individual activity like a flight, only show one avatar. If it's a group activity, show the avatars of the people who want to attend
            *   this can dictate who we send notifications to about when an event is starting, etc
        *


# Design Ideas

_(2-5 paragraphs) Proposed solutions._

In order to keep track of the users, their trips, and their trip activities, we will need to use one of several databases, as well as associate trips with the Google users assigned to them so users only see and access trips for which they are an owner or collaborator (e.g. user Charlie should not be able to see the trip being planned by Alice and Bob until he is added as a collaborator).


## Database Choice

Google Cloud Firestore was chosen as the database used for this project. The alternative option for our database was using Cloud Datastore. We decided against this idea, however, because we realized that Firestore is built to handle real-time client updates and it has a developer-friendly structure of [documents](https://firebase.google.com/docs/firestore/data-model#documents ) and collections. For more information on why datastore was not chosen, see the [Alternatives section](#bookmark=id.5xej4za5g84t).


### Database Structure using Firestore:

<span style="text-decoration:underline;">Structure</span>: At the top level, there is a Trips Collection that contains Trip Documents corresponding to each created trip. Contained within each trip document is a sub-collection called activities. This sub-collection contains Activity Documents corresponding to the activities for its parent trip.

Trip Collection

		Trip Document

			trip_field_1: …

			…

			activities_subcollection

				Activity Document

					activity_field_1

					…

				...

		...

<span style="text-decoration:underline;">Properties for each Collection’s Documents</span>:



*   Trip
    *   Document Id
    *   Name (String)
    *   Short Description (String)
    *   General Destination (String)
    *   Start Date (Date)
    *   End Date (Date)
    *   Start Timezone
    *   End Timezone
    *   Timestamp of trip creation (Timestamp)
    *   Collaborators (Array&lt;String == User uId>)
*   Activity
    *   Document Id
    *   Category (Enum)
        *   All other properties are determined by activity’s category
    *   Title
    *   StartTime (Timestamp)
    *   EndTime (Timestamp)
    *   Start Timezone
    *   End timezone
    *   Location (geoPt)
    *   Description (Text/String)
    *   Any other fields that are specific to the activity of type ‘Category’

Additional non-MVP fields may be added to each of these documents.


## User Authentication


### Firebase Authentication for User Management

For the MVP, all users will only be able to login using their Google account. Past the MVP, support for logging in via other means can be implemented, such as using Facebook, Github, or even standard email/password login. Firebase Authentication will be used to both authenticate users and manage the userbase of SLURP (for storing/retrieving a user’s email, unique ID, display name, and any other relevant properties we would need from a user).

The MVP consists of 4 pages:



*   <span style="text-decoration:underline;">Landing</span>: The home page of the website where the user initially arrives. Consists of a welcome screen and a button redirecting the user to the Sign In page.
*   <span style="text-decoration:underline;">Sign In</span>: Provides various methods for the user to sign in (for the MVP, only with a Google account). This page uses FirebaseUI to easily provide these methods of signin. On sign-in (or if the user had already logged in previously) the user is redirected to the View Trips page.
*   <span style="text-decoration:underline;">View Trips</span>: Where the user can view all trips they are associated with. More details given in the [Trip Management](#bookmark=id.cp6j9xkrbk8m) section.
*   <span style="text-decoration:underline;">View Activities</span>: Where the user can view the activities for a particular trip. More details given in the [Activity Management](#bookmark=id.1p85uii1kzn) section.

Each page of the website can be put into one of two categories: Routes and PrivateRoutes.



*   <span style="text-decoration:underline;">Routes</span>: These pages are public and any user, regardless of whether they have logged in or not, can access these pages. For the MVP, these apply to the Landing and Sign In pages.
*   <span style="text-decoration:underline;">PrivateRoutes</span>: These pages are private and the user must be signed in order to view these pages. If a user is not signed in they will immediately be redirected to the Sign In page. For the MVP, these apply to the View Trips and View Activities pages.

To keep track of the authentication status of the user at all times, a listener to Firebase is established when the web application starts, which updates the authentication state of the user when it changes.


### Using the Google Client API Library for Javascript (GAPI)

Some planned future features require us to use Google APIs that may need a user’s private data. For example, a planned feature is to integrate a trip itinerary with a user’s Google Calendar. Doing this requires a separate authentication scheme. The Google Client API Library for Javascript (GAPI) comes packaged with an authentication client that allows this to be done, returning a temporary access token that allows a client to make requests to Google APIs for the corresponding user’s data.

In pages or scenarios where we need to use a Google API, we prompt the user to login once again with their Google Account, this time being managed with GAPI rather than Firebase Auth. We then use the returned access token to access the API we wish to use.


## Trip Management


### Interface with User Authentication

When a user logs in with the authentication system, they are redirected to the _view trips_ page. Following any additional authentication on load of the page, the current user email is fetched from Firestore (see [User Authentication](#bookmark=id.kdxffpn9z9wh)).


### View a User’s Trips

Following the verification of the existence of the user in the datastore, the Trip collection is queried for all of the trips for which that user is a collaborator. This querying can be done using the [array-contains](https://firebase.google.com/docs/firestore/query-data/queries#array_membership) comparison operation on the collaborators field. All trips where a user is a collaborator will be displayed in order based on the most recently created/edited trip. Once the MVP is complete, additional features for the _view trips_ page will be explored such as filtering trips based on other properties such as start date or initial creation time. Others include different access levels for trips or a _pending invites_ section for trips you have been invited to. For more potential extensions see the [Extensions](#bookmark=id.kgaughxnd9vg) section.


### Manage Trips

In addition to viewing current trips that the user is a part of, they will have three options for managing their trips: **adding** new trips as well as **editing** and **deleting** an existing trip

When creating a new trip, the user will enter information for each of the [Trip fields](#bookmark=id.v95bw035q5p). This will create a new entity in the database that contains the information the owner entered. For the collaborator list, the trip creator will enter emails for the other collaborators. If they currently exist in the system, the Firebase Auth user uid corresponding to the user email will be placed in the collaborator list. Otherwise, a new user with that email will be created and the corresponding uuid for that email will be entered in the list. In either case, any other collaborators will be able to view this trip on the _view trips_ page.

Upon fetching and populating each of the trips associated with the user, they will have the option to edit or delete an existing trip. For editing a trip, a similar menu will appear as creating a new trip but the current values for each of the trip fields will be filled in. When saved, the current form data will overwrite the data for the existing trip in the database. When a user selects and confirms they want to delete a trip, the trip and its associated activities will be deleted for all collaborators. Once the MVP is complete, one additional feature would be to add certain access levels (owner and admins) that would limit who could edit the trip information.

In terms of error handling, all data validation, cleaning, and formatting is done when creating/editing a trip (input side). This includes some input cleaning to ensure that each of the fields are filled out. If not, a default value is provided. Additionally, email validation for the collaborator emails will be included post-MVP. This decision was made so that the database only stores cleaned/formatted data. This makes the module responsible for querying and rendering trips very straightforward.


### Interface with Activity Management

Any collaborator can “open” a trip by clicking the _trip events_ link/button on an individual trip. Once a trip is chosen, a get request is sent to the _activity management_ page with the Trip Document Id stored in the query string of the URL. At that point, the activity page will query the Trips collection for the trip with the document Id equal to the one stored in the query string. Once obtaining the Trip document, each activity can be accessed by fetching each Activity document in the Activities subcollection of the Trip Document.

For each Trip document in Firestore, there will only be one Activity subcollection that holds all types of activities.  An Activity superclass would be defined as well as subclasses for the different types of activities. Because Firestore is NoSQL, we can store the common fields across activities in addition to a category enumeration. This way, when pulling an activity entity from the datastore, the enum can be used as an indicator of which subclass the entity belongs to. This step lies at the intersection of the Trip Management and Activity management subsystems.


## Activity Management (Low-Level Trips)

There are lots of different activity types possible, however, the below are our highest priority (in no particular order):



*   Generic Activity (can be anything)
*   Stay (hotels, camping, etc.)
*   Eat (restaurant reservations)
*   Drive


### Querying the database

Users will need to create, read, modify, and delete each of the activities on their trip.

When the Activity Management page loads, all the activities’ details will need to be queried using the keys from the Trip.

When a user adds a new activity, a new Activity is added to the database, along with all of the provided information. This new Activity’s key is generated and added to the Trip’s list of pre-existing keys.

If a user edits an activity, the Activity’s key is used to find the entry in the database and the appropriate field in the database is changed.

If a user deletes an activity, the Activity’s key is removed from the Trip and the Activity is removed from the database.


## File Organization

More details on File Organization can be found in the [Project Structure](https://github.com/googleinterns/step53-2020#project-structure) section of the SLURP’s README, and is recommended to look at to see the directory trees of the project and further details of components. In summary, the structure of the project can be separated into a frontend part and a backend part.



*   <span style="text-decoration:underline;">Frontend</span>: Manages the website on the client-side. The frontend is built using the React web framework and utilizes Firebase for its backend-as-a-service. As a result, the majority of SLURP will be written on the frontend, with all the relevant HTML, CSS, and JS files written here.
*   <span style="text-decoration:underline;">Backend</span>: Manages the website on the server-side. The backend is built using Google’s App Engine platform, written in Java. With the use of Firebase, we have no need to use the backend part for the MVP. We leave it in however in case we wish to write our own server code in the future.


## Scalability Solutions

This web application will be hosted on Google Cloud. It can accommodate over one million queries per second.[^1] If this application reaches a point where that is too few queries, we have either become Google or we have become victim of a rather well-coordinated DDOS attack.

Cloud Firestore is also designed to scale horizontally in case our database becomes very large. See the [Firestore documentation](https://firebase.google.com/docs/firestore/#key_capabilities) for more info on key capabilities such as scalability.

With regard to purchasing additional database accesses, we can:



*   Use ads to gain ad revenue necessary to pay for more database reads/writes.


*   Use ads to drive away some of our customer base.


*   Sell the product to a company which can handle larger-scale operations.

## Real-time Editing

To allow for collaborators of a trip to edit trip details and itineraries in real time, React and Firebase are used in conjunction. React supports instant client-side rendering whenever any update is done on website data, and Firestore “uses data synchronization to update data on any connected device upon edits to the database.”[^2] As such, a listener is set up on the client side to determine whenever new data is available from the Firestore database. A process is also set up on the cloud that monitors this query so that it knows whether or not there is new data available for that query. When a trip or activity is updated (added, edited, or deleted), only the trip or activities that changed will be updated asynchronously with React.


## Calendar Compatibility

We can use the Calendar API to create a calendar, share it with all the collaborators, and silently add/modify/remove events as the trip is planned.

See calendar_compatibility_feature.md.


## Trip Invites

See trip_invites_feature.md.


## Shareable Trip Maps

We can add a field for the location of an activity to help us generate shareable trip maps and calculate driving routes between activities (using the Maps and Directions APIs).


# Timeline

For reference:


<table>
  <tr>
   <td><strong>Week #</strong>
   </td>
   <td><strong>Due Date</strong>
<p>
<strong>(EOD)</strong>
   </td>
   <td><strong>Deliverable</strong>
   </td>
   <td><strong>Owner(s)</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="7" >6
   </td>
   <td>06/23/2020
<p>
Monday
   </td>
   <td>Setup project infrastructure (html pages, setup maven and appengine, etc.)
<p>
Finish project timeline.
   </td>
   <td>all
   </td>
  </tr>
  <tr>
   <td rowspan="3" >06/24/2020
<p>
Wednesday
   </td>
   <td>Implement login page
<ul>

<li>When not logged in, display the landing page with a sign-in button if the user is not logged in

<li>Redirect urls for sign-in are to the user’s Trips page
</li>
</ul>
   </td>
   <td>keiffer
   </td>
  </tr>
  <tr>
   <td>Display activities (query and view, including UI)
<ul>

<li>Create a database with fake activities

<li>Query and fetch these activities and display them.
</li>
</ul>
   </td>
   <td>ananyay
   </td>
  </tr>
  <tr>
   <td>Display all trips associated with fake current user
<ul>

<li>Make dummy JS function that returns hardcoded current user email (will eventually be from authenticated-user-email servlet)

<li>Create Trips kind with fake trip entities

<li>Query (servlet), fetch (js), and display (UI) all trip entities with current username
</li>
</ul>
   </td>
   <td>zghera
   </td>
  </tr>
  <tr>
   <td rowspan="3" >06/26/2020
<p>
Friday
   </td>
   <td>Authenticate user for the Trips and Itinerary pages
<ul>

<li>Not logged in: Redirect to landing page

<li>Logged in: generate a logout URL for use in the header (to be implemented later)
</li>
</ul>
   </td>
   <td>keiffer
   </td>
  </tr>
  <tr>
   <td>Display the fake activities from earlier in chronological order.
   </td>
   <td>ananyay
   </td>
  </tr>
  <tr>
   <td>Use authenticated user now instead of fake current user
   </td>
   <td>zghera
   </td>
  </tr>
  <tr>
   <td rowspan="6" >7
   </td>
   <td rowspan="2" >06/30/2020
<p>
Tuesday
   </td>
   <td>Implement header
<ul>

<li>Contains rudimentary user profile information and a logout link on the right side

<li>Rest of the header is flexible for zghera and ananyay to use however they want
</li>
</ul>
   </td>
   <td>keiffer
   </td>
  </tr>
  <tr>
   <td>Create ‘add trip’ functionality for current user
<ul>

<li>Create form entry on new page (will eventually be pop-up) to create new trip

<li>Trip fields are all simple strings for now

<li>Once add new trip, redirect back to trip page
</li>
</ul>
   </td>
   <td>zghera
   </td>
  </tr>
  <tr>
   <td rowspan="4" >07/01//2020
<p>
Wednesday
   </td>
   <td>Initial styling of landing page
   </td>
   <td>keiffer
   </td>
  </tr>
  <tr>
   <td>Add “add activity” functionality:
<ul>

<li>Form entry on page for adding a new activity

<li>Add the new activity to the database

<li>Update activity list to show new activity
</li>
</ul>
   </td>
   <td>ananyay
   </td>
  </tr>
  <tr>
   <td>Delete trip functionality for owners only
<p>
Add ‘view activities’ button for a trip
<ul>

<li>Send GET request to Ananya's list-activities servlet with the project-id in the query string
</li>
</ul>
   </td>
   <td>zghera
   </td>
  </tr>
  <tr>
   <td>Incorporate feedback from this week’s feedback sessions
   </td>
   <td>all
   </td>
  </tr>
  <tr>
   <td rowspan="5" >8
   </td>
   <td rowspan="2" >07/07/2020
<p>
Tuesday
   </td>
   <td>Update trip fields to be appropriate for data type stored
   </td>
   <td>zghera
   </td>
  </tr>
  <tr>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td rowspan="3" >07/09/2020
<p>
Thursday
   </td>
   <td>Add “Modify activity” functionality:
<ul>

<li>Modify from activity view screen

<li>Update database

<li>Update activity list to reflect changes
</li>
</ul>
   </td>
   <td>ananyay
   </td>
  </tr>
  <tr>
   <td>Add “Modify activity” functionality:
<ul>

<li>Add option to edit a selected trip

<li>Same as add activity for the most part
</li>
</ul>
   </td>
   <td>zghera
   </td>
  </tr>
  <tr>
   <td>Finish MVP
   </td>
   <td>all
   </td>
  </tr>
</table>



# Alternatives Considered

_(2 paragraphs) Include alternate design ideas here which you are leaning away from and short justifications as to why._


## Database Choice

We heavily considered using Datastore instead of Firestore because it was familiar to us and we wouldn’t need to re-familiarize ourselves with the new technology. However, Cloud Datastore has some limitations that Firestore fixes. Some of these fixes in firestore include native real-time updates, new and more effective data model, and web client libraries.[^3]

See Appendix for more detailed comparison.


## Authentication Choice

The other primary authentication method considered was using the Users API as provided by App Engine:

Pros:



*   We learned how to use this during the structured portfolio project, so setting it up and using it would be straightforward.

Cons:



*   Google itself [does not recommend this method](https://cloud.google.com/appengine/docs/standard/java/users).
*   It is not immediately clear how the API can be used to obtain an access token for the user to be used with other Google APIs.


# Appendix: Alternative Database Structure


<table>
  <tr>
   <td>
   </td>
   <td><strong>Option 1: Google Datastore</strong>
   </td>
   <td><strong>Option 2: Firebase > Firestore Database</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Pros</strong>
   </td>
   <td>We know how to interface with it/we have more experience. Very easy to use.
   </td>
   <td>
<ul>

<li>Its data model is designed for nested ‘objects’ through the use of collections
    	Top-level collection > documents > sub-collection > document > etc.
<p>

    	This would be useful for specifying different types of trip objects.
<ul>

<li>Real-time update capability (for post-MVP stuff)
</li>
</ul>
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td><strong>Cons/considerations</strong>
   </td>
   <td>
<ul>

<li>No real time updates

<li>Issue when it comes to storing nested objects (not as clean and layed out as with firestore). E.g when storing activities inside of a trip entity, these are our options
<ul>

<li>JSON String
<ul>

<li>Each activity would be stored as a JSON string inside a Trip data object. This is the grossest of the gross solutions.
</li>
</ul>

<li>List of activity entity id’s
<ul>

<li>Many types of activity kinds

<li>Problems: 1. Would need to store the type of entity (kind) alongside each id. 2. Having many databases is probably not ideal. 3. Can’t have encapsulation-style trip organization

<li>One activity kind and a lot of fields

<li>Problems: Will need to include a ‘Category’ enum that reflects which type of activity is so that we know which fields to look for in the activity entity.
</li>
</ul>

<li>A single pointer/key to where all the activity entities for this trip are located (problem with previous 2 bullets: would need to update this field every time we edit the activities)
</li>
</ul>
</li>
</ul>
   </td>
   <td>
<ul>

<li>When it comes to ‘initializing firebase>firestore’ where do we do this and how frequent is this process (see <a href="https://firebase.google.com/docs/firestore/quickstart#initialize">here</a>)?
<ul>

<li>Or can we do everything in Java? Maybe it just as easy as declaring these as static variables/method in any servlets that need to use it?

<li>Do we need to do this only in JS? It looks like maybe whenever we pull from firestore we directly do it in JS, then we can add to firestore in our servlets?
<ul>

<li>The tutorial guy does it in JS but he seems to have no backend at all.
</li>
</ul>
</li>
</ul>
</li>
</ul>

<li>How to do real-time updates?
<ul>

<li>But if we want to do realtime updates, then I don't think we could implement the update listener in the servlets because then we would have to redirect to the page every time in order to trigger a GET request which pulls the info from the servlet.

<li>Rather we would probably just have the listener in js like the guy in <a href="https://youtu.be/2Vf1D-rUMwE">this video</a> had.
</li>
</ul>
   </td>
  </tr>
</table>



# Issues

_Known issues other pods have had and their solutions._


<table>
  <tr>
   <td><strong>Issue</strong>
   </td>
   <td><strong>Solution</strong>
   </td>
  </tr>
  <tr>
   <td>Want to use Firebase in Java servlets
   </td>
   <td>Firebase uses a backend-as-a-service model, so all specific implementations for managing a database or user authentication such as putting data in, retrieving data, or signing in a user is managed by simply querying the relevant functions.
<p>
Thus, if there is no specific reason for needing to use Firebase from Java servlets, we recommend implementing all Firebase related functionality in the frontend (Javascript/Web).
   </td>
  </tr>
  <tr>
   <td>Unable to generate a Service Account key in order to make server side requests (Java Servlets) to Firebase admin
   </td>
   <td>Service account key creation has been disabled for all STEP intern cloud projects. Your host can request a service key exemption for your project, which may take several days to get authorized. Once done so, you can create a private key for your service account, such as the Firebase Admin SDK service account, to make authorized requests to your database.
   </td>
  </tr>
</table>



<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]:
     [https://cloud.google.com/load-balancing](https://cloud.google.com/load-balancing)

[^2]:
     [https://firebase.google.com/docs/firestore/query-data/listen](https://firebase.google.com/docs/firestore/query-data/listen)

[^3]:
     [https://cloud.google.com/datastore/docs/firestore-or-datastore#in_native_mode](https://cloud.google.com/datastore/docs/firestore-or-datastore#in_native_mode) 
