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


// Initialize Firebase and its related product we use using the provided
// Firebase project configuation.

// TO USE THE EMULATOR: UPDATE THESE TWO VALUES. 
const USE_EMULATOR = true;
const FIREBASE_EMULATOR_PORT = 8000; // This is the port from when you run firebase emulators:start 

const RUN_LOCALLY = USE_EMULATOR && (location.hostname === "localhost" || location.hostname === "");
const PROJECT_ID = "step53-2020";

var firebaseConfig;
if (RUN_LOCALLY) {
  firebaseConfig = {
    projectId: PROJECT_ID, 
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyAAJgRhJY_rRn_q_On1HdA3hx15YHSkEJg",
    authDomain: "step53-2020.firebaseapp.com",
    databaseURL: "https://step53-2020.firebaseio.com",
    projectId: PROJECT_ID,
    storageBucket: "step53-2020.appspot.com",
    messagingSenderId: "905834221913",
    appId: "1:905834221913:web:25e711f1132b2c0537fc48",
    measurementId: "G-PLVY991DHW"
  };
}
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

if (RUN_LOCALLY) {
  db.settings({
    host: "localhost:" + FIREBASE_EMULATOR_PORT,
    ssl: false
  });
}
