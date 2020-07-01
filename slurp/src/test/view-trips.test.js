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

import * as firebase from 'firebase/app';
import 'firebase/firestore';

const view_trips = require('../main/webapp/scripts/view-trips.js');
const init_fb = require('../main/webapp/scripts/init-firebase.js');

const STALIN_EMAIL = 'stalin@ussr.com';
const FDR_EMAIL = 'fdr@usa.com';
// const JFK_EMAIL = 'jfk@usa.com';
// const KRUSHCHEV_EMAIL = 'krushchev@ussr.com';
const COMMON_DEST = 'Earth';

test('aaa', () => {
  init_fb.db.collection(init_fb.TRIP_COLLECTION)
      .add({
        collaborators: [STALIN_EMAIL, FDR_EMAIL],
        description: 'the big one',
        desination: COMMON_DEST,
        end_date: firebase.firestore.Timestamp.fromDate(
            new Date('September 1, 1939')),
        start_date: firebase.firestore.Timestamp.fromDate(
            new Date('September 2, 1945')),
        name: 'WWII'
      })
      .then(doc => {
        console.log('Successfully wrote WWII trip doc with ID: ', doc.id);
      })
      .catch(error => {
        console.log('Error adding WWII trip doc: ', error);
      });

  expect(1).toEqual(1);
});

// beforeAll(() => {
//   init_fb.db.collection(init_fb.TRIP_COLLECTION)
//       .add({
//         collaborators: [STALIN_EMAIL, FDR_EMAIL],
//         description: 'the big one',
//         desination: COMMON_DEST,
//         end_date: firebase.firestore.Timestamp.fromDate(
//             new Date('September 1, 1939')),
//         start_date: firebase.firestore.Timestamp.fromDate(
//             new Date('September 2, 1945')),
//         name: 'WWII'
//       })
//       .then(doc => {
//         console.log('Successfully wrote WWII trip doc with ID: ', doc.id);
//       })
//       .catch(error => {
//         console.log('Error adding WWII trip doc: ', error);
//       });
//   init_fb.db.collection(init_fb.TRIP_COLLECTION)
//       .add({
//         collaborators: [STALIN_EMAIL, JFK_EMAIL],
//         description: 'its a little chilly',
//         desination: COMMON_DEST,
//         end_date:
//             firebase.firestore.Timestamp.fromDate(new Date('January 1, 1947')),
//         start_date: firebase.firestore.Timestamp.fromDate(
//             new Date('December 31, 1991')),
//         name: 'Cold War'
//       })
//       .then(doc => {
//         console.log('Successfully wrote Cold War trip doc with ID: ', doc.id);
//       })
//       .catch(error => {
//         console.log('Error adding Cold War trip doc: ', error);
//       });
// });

// afterAll(() => {
//   init_fb.db.collection(init_fb.TRIP_COLLECTION)
//       .where(init_fb.DESTINATION_FIELD, '==', COMMON_DEST)
//       .get()
//       .then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//           doc.delete();
//         });
//       })
//       .then(() => {
//         console.log('Successfully deleted all test trips.');
//       })
//       .catch(error => {
//         console.log('Error in deleting test trips: ', error);
//       });
// });

// test('Choose user who is collaborator on two trips.', () => {
//   return view_trips.queryUserTrips(STALIN_EMAIL)
//       .then(querySnapshot => {
//         querySnapshot.forEach(doc => {
//           expect(doc.data().desination.toBe(COMMON_DEST));
//         });
//       })
//       .catch(error => {
//         console.log('Error: ', error);
//       });
// });

// test('Choose user who is not a collaborator on any trips.', () => {
//   return view_trips.queryUserTrips(KRUSHCHEV_EMAIL)
//       .then(querySnapshot => {
//         expect(querySnapshot.empty).toBeTruthy();
//       })
//       .catch(error => {
//         console.log('Error: ', error);
//       });
// });

// test(
//     '...Do something that causes catch case here...',
//     () => {
//         // const url = "test.html?key1=!#sJk3r2Iedy2dw[-cc2>&key2=value2";
//         // const urlParams = utils.parseUrl(url);
//         // expect(urlParams).toEqual({"key1": "!#sJk3r2Iedy2dw[-cc2>", "key2":
//         // "value2"});
//     });
