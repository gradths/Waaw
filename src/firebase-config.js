import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCQTvbv1055_g-BHKSlsmt8C3evXZ31J8s",
  authDomain: "crud1-5db7d.firebaseapp.com",
  projectId: "crud1-5db7d",
  storageBucket: "crud1-5db7d.appspot.com",
  messagingSenderId: "199159841325",
  appId: "1:199159841325:web:eac4034ddd5c5946b8eea4",
  measurementId: "G-Q8S6EJP9R0"
};

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const storage = getStorage(app)