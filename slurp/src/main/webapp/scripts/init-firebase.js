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

const USE_EMULATOR = true;
// const LOCALHOST_FIREBASE_PORT = 9000;

const RUN_LOCALLY = USE_EMULATOR && (location.hostname === "localhost" || location.hostname === "");

// var p = JSON.parse('{"name":"John", "age":30, "city":"New York"}');
// console.log(p.name);

var firebaseConfig;
if (RUN_LOCALLY) {
  firebaseConfig = {
    projectId: "step53-2020", 
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyAAJgRhJY_rRn_q_On1HdA3hx15YHSkEJg",
    authDomain: "step53-2020.firebaseapp.com",
    databaseURL: "https://step53-2020.firebaseio.com",
    projectId: "step53-2020",
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
    host: "localhost:8000",
    ssl: false
  });
}