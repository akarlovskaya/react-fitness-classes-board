import { loadFirestoreRules, initializeTestApp, clearFirestoreData, initializeAdminApp } from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';

// create DB instance, loads rules, populates with mock data
module.exports.setup = async (auth, data) => {
  const projectId = `react-fitness-classes-bo-df7e0`;
  const app = initializeTestApp({
    projectId,
    auth
  });

  // console.log(app.auth().currentUser)

  const db = app.firestore();

  // Write mock documents before rules
  if (data) {
    const admin = initializeAdminApp({
      projectId,
    });


    for (const key in data) {
      const ref = admin.firestore().doc(key);
      await ref.set(data[key]);
    }
  }

  // Apply rules
  await loadFirestoreRules({
    projectId,
    rules: readFileSync('firestore.rules', 'utf8')
  });

  return db;
};

// delete app after test is done
module.exports.teardown = async () => {
  Promise.all(firebase.apps().map(app => app.delete()));
  await clearFirestoreData();
};