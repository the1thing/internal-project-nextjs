import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPAowvd3HckO9Xhbc3o_F7RHjzEchKtpg",
  authDomain: "onething-proposals.firebaseapp.com",
  projectId: "onething-proposals",
  storageBucket: "onething-proposals.firebasestorage.app",
  messagingSenderId: "1085696405004",
  appId: "1:1085696405004:web:d0e97e78e0f501f40cc829"
 };

// Initialize Firebase only if there are no apps initialized
const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// Export Firestore instance
export const db = getFirestore(firebaseApp);
