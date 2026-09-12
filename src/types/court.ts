export const Backboard = {
  Metal:   "Metal",
  Plastic: "Plastic",
  Wood:    "Wood",
} as const;

export type BackboardType = typeof Backboard[keyof typeof Backboard];

export const Court = {
  HalfCourt: "HalfCourt",
  FullCourt: "FullCourt",
} as const;

export type CourtType = typeof Court[keyof typeof Court];

export const Environment = {
  Indoor:  "Indoor",
  Outdoor: "Outdoor",
} as const;

export type EnvironmentType = typeof Environment[keyof typeof Environment];

export const Ring = {
  Double: "Double",
  Single: "Single",
} as const;

export type RingType = typeof Ring[keyof typeof Ring];

export const Surface = {
  Bitumen:    "Bitumen",
  Concrete:   "Concrete",
  Rubberized: "Rubberized",
  Wood:       "Wood",
} as const;

export type SurfaceType = typeof Surface[keyof typeof Surface];

export type Court = {
  name:            string,
  backboardType:   BackboardType,
  courtType:       CourtType,
  environmentType: EnvironmentType,
  ringType:        RingType,
  surfaceType:     SurfaceType,
};
