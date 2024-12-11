import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBXpXqAY7BSkCYzsCDDtNCve255BwrjnZk",
  authDomain: "internal-project-8163e.firebaseapp.com",
  projectId: "internal-project-8163e",
  storageBucket: "internal-project-8163e.appspot.com",
  messagingSenderId: "16645092059",
  appId: "1:16645092059:web:c1a0c7aecaaf5d6122d2fe",
};

// Initialize Firebase only if there are no apps initialized
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// Export Firestore instance
export const db = getFirestore(firebaseApp);
