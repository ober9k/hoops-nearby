import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import { firestoreDb } from "./firebase";

function App() {
  const [ courts, setCourts ] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(firestoreDb, "courts"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const courtsArray: any[] = [];
      querySnapshot.forEach((doc) => {
        courtsArray.push({ ...doc.data(), id: doc.id });
      });
      setCourts(courtsArray);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  });

  return (
    <>
      <section>
        <h2>Local Courts</h2>
        <p>Hello World.</p>
        <ul>
          {courts.map((court, key) => (
            <li key={key}>
              <h3>{court.location}</h3>
              <p>{court.suburb}: {court.courts?.length || 0} court(s)</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default App;
