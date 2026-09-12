import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCybBHBKUNqoBv0Lx4asILZs-H8D9SmxWs",
  authDomain: "hoops-nearby.firebaseapp.com",
  projectId: "hoops-nearby",
  storageBucket: "hoops-nearby.firebasestorage.app",
  messagingSenderId: "686202271168",
  appId: "1:686202271168:web:9b3ce649bf52c9af73c425",
};

const firebaseApp = initializeApp(firebaseConfig);
const firestoreDb = getFirestore(firebaseApp);

export { firebaseApp, firestoreDb };
