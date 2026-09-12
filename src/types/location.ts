import type { Court } from "./court.ts";

export type Location = {
  id:          string,
  name:        string,
  suburb:      string,
  coordinates: string[],
  courts:      Court[],
};
