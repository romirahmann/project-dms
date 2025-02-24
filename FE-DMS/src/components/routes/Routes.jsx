import {
  createRouter,
  createRootRoute,
  createRoute,
  createHistory,
} from "@tanstack/react-router";
import { Layout } from "../Layout";
import { Homepage } from "../../pages/Homepage";
import { SearchPage } from "../../pages/SearchPage";

// 1️⃣ Root Route
const rootRoute = createRootRoute({
  component: Layout,
});

// 2️⃣ Child Routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Homepage,
});
const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
});
const filesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/files",
  component: SearchPage,
});
const classificationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/classifications",
  component: SearchPage,
});

// 3️⃣ Gabungkan Semua Routes
const routeTree = rootRoute.addChildren([
  homeRoute,
  searchRoute,
  filesRoute,
  classificationRoute,
]);

// 4️⃣ Buat Router dengan `createHistory`
export const router = createRouter({
  routeTree,
});
