import firebase, { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore/lite";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getAuth } from "firebase/auth";

let app: firebase.FirebaseApp;

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const apps = getApps();
if (!apps.length) {
  app = initializeApp(config);
} else {
  app = apps[0];
}

const firestore = getFirestore(app);
const functions = getFunctions();
const auth = getAuth(app);
functions.region = "us-central1";

if (process.env.NODE_ENV !== "production") {
  connectFunctionsEmulator(functions, "localhost", 5111);
  connectFirestoreEmulator(firestore, "localhost", 8081);
}

export { firestore, functions, auth, config, app };
