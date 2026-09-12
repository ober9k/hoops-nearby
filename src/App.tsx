import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { collection, getDocs, query } from "firebase/firestore";
import "./App.css";
import { firestoreDb } from "./firebase";
import type { Court } from "./types/court.ts";
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
};

export type CourtProps = {
  court: Court;
};

function Court(props: CourtProps) {
  const { court } = props;
  return (
    <>
      <h4>{court.name}</h4>
      <p>
        <span>backboard: {court.backboard}</span>,&nbsp;
        <span>environment: {court.environment}</span>,&nbsp;
        <span>ring: {court.ring}</span>,&nbsp;
        <span>size: {court.size}</span>,&nbsp;
        <span>surface: {court.surface}</span>
      </p>
    </>
  );
}

function Courts() {
  const query = useQuery<Location[]>({ queryKey: ['courts'], queryFn: fetchCourts });

  return (
    <ul>
      {query.data?.map((court, key) => (
        <li key={key}>
          <h3>{court.name}</h3>
          <p>{court.suburb}: {court.courts.length || 0} court(s)</p>
          <ul>
          {court.courts.map((court, key) => (
            <li key={key}>
              <Court court={court} />
            </li>
          ))}
          </ul>
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
