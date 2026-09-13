import { createRootRoute, createRoute } from "@tanstack/react-router";
import DefaultLayout from "../layouts/defaultLayout";
import { HomePage, LocationsPage, ViewLocationPage } from "../App";

export const rootRoute = createRootRoute({
  component: DefaultLayout,
  beforeLoad: () => {},
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const locationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/locations",
  component: LocationsPage,
});

const viewLocationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/locations/$locationId",
  component: ViewLocationPage,
});

export const routeTree = rootRoute.addChildren([
  homeRoute,
  locationsRoute,
  viewLocationRoute,
]);
