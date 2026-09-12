import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { collection, getDocs, query } from "firebase/firestore";
import "./App.css";
import { firestoreDb } from "./firebase";
import { type Location } from "./types/location.ts";

const queryClient = new QueryClient();

const fetchCourts = async () => {
  const q = query(collection(firestoreDb, "courts"));
  const courts: Location[] = [];

  try {
    const qSnap = await getDocs(q);
    if (qSnap.empty) {
      return courts;
    }
    qSnap.forEach((doc) => {
      courts.push({ ...doc.data(), id: doc.id } as Location);
    });
  }
  catch (error) {
    console.error("2:", error);
    throw error; /* todo fix */
  }

  return courts;
}

function Courts() {
  const query = useQuery<Location[]>({ queryKey: ['courts'], queryFn: fetchCourts });

  return (
    <ul>
      {query.data?.map((court, key) => (
        <li key={key}>
          <h3>{court.name}</h3>
          <p>{court.suburb}: {court.courts.length || 0} court(s)</p>
        </li>
      ))}
    </ul>
  );
}

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <section>
          <h2>Local Courts</h2>
          <p>Hello World.</p>
          <Courts />
        </section>
      </QueryClientProvider>
    </>
  );
}

export default App;
