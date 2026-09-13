import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import "./App.css";
import { firestoreDb } from "./firebase";
import type { Court } from "./types/court.ts";
import { type Location } from "./types/location.ts";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routes/routes.ts";

const queryClient = new QueryClient();

const fetchCourts = async () => {
  const q = query(collection(firestoreDb, "locations"), orderBy("name"));
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

const router = createRouter({
  routeTree,
  context: {
    queryClient: new QueryClient()
  },
});

function Courts() {
  const query = useQuery<Location[]>({ queryKey: ['locations'], queryFn: fetchCourts });

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

export function HomePage() {
  return (
    <>
      <h1>Home</h1>
    </>
  );
}

export function LocationsPage() {
  return (
    <>
      <h1>Locations</h1>
    </>
  );
}

export function ViewLocationPage() {
  return (
    <>
      <h1>View Location</h1>
    </>
  );
}

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
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
