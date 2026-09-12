export const Backboard = {
  Metal:   "Metal",
  Plastic: "Plastic",
  Wood:    "Wood",
} as const;

export type BackboardType = typeof Backboard[keyof typeof Backboard];

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

export const Size = {
  HalfCourt: "HalfCourt",
  FullCourt: "FullCourt",
} as const;

export type SizeType = typeof Size[keyof typeof Size];

export const Surface = {
  Bitumen:    "Bitumen",
  Concrete:   "Concrete",
  Rubberized: "Rubberized",
  Wood:       "Wood",
} as const;

export type SurfaceType = typeof Surface[keyof typeof Surface];

export type Court = {
  name:        string,
  backboard:   BackboardType,
  environment: EnvironmentType,
  ring:        RingType,
  size:        SizeType,
  surface:     SurfaceType,
};
