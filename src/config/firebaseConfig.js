import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
import constants from "expo-constants";

const env_variables = constants.manifest.extra;
console.log({ env_variablesenv_variables: env_variables });
const firebaseConfig = {
  apiKey: env_variables.apiKey,
  authDomain: env_variables.authDomain,
  projectId: env_variables.projectId,
  databaseURL: env_variables.databaseURL,
  storageBucket: env_variables.storageBucket,
  messagingSenderId: env_variables.messagingSenderId,
  appId: env_variables.appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getDatabase();
export { db, ref, onValue };
