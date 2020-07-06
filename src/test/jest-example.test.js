// Firebase testing configuration
const fb_test = require('@firebase/testing');
const fb_admin = require('firebase-admin');
const jestEx = require('../main/webapp/scripts/jest-example');

const projectId = 'step53-2020';
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8000';
let app = fb_admin.initializeApp({projectId});
let db = fb_test.firestore(app);

// Jest setup and unit tests
beforeAll(async () => {
  await fb_test.clearFirestoreData({projectId});
});

test('Adds 1 + 2 to equal 3', () => {
  expect(jestEx.sum(1, 2)).toBe(3);
  expect(1).toBe(1);
});

test('Confirm sample doc was written to firestore', async () => {
  const collection = 'samples';
  const docId = 'sample1';
  const docNum = 1;

  await jestEx.addSampleDocToFirestore(db, collection, docId, docNum);

  const docRef = db.collection(collection).doc(docId);
  const doc = await docRef.get();
  if (!doc.exists) {
    console.error('No such document exists!');
  } else {
    expect(doc.data().doc_num).toBe(docNum);
  }
});
