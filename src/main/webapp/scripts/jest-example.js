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
// import firebase from '@firebase/app'
import * as init_fb from './init-firebase.js'

/**
 * This function provides a simple example of how to use the Jest module.
 * It has nothing to do with the functionality of the overall project.
 */
function sum(a, b) {
  return a + b;
}

/**
 * This function
 */
function addSampleDocToFirestore(db, collection, docId, docNum) {
  db.collection(collection).doc(docId).set({
    doc_num: docNum
  })
  .then(() => {
    console.log("Document written successfully");
  })
  .catch(error => {
    console.error("Error writing document: ", error);
  });
}

/**
 * This method serves as an example of how code will be called in other js files
 * in order to separate the db that is used for deployment vs testing.
 *
 * It was verifyed that the app deployed using mvn package appengine:run ran
 * successfully and there were no errors in the console when including this
 * script in index.html.
 */
function loadPage() {
  addSampleDocToFirestore(init_fb.db, "samples", "doc1", 1);
}

// Check if we are in node or in a browser
if (typeof exports !== 'undefined') {
  module.exports = { sum, addSampleDocToFirestore };
} else {
  window.onload = loadPage;
}
