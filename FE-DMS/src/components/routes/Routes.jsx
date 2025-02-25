import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import { Layout } from "../Layout";
import { Homepage } from "../../pages/Homepage";
import { SearchPage } from "../../pages/SearchPage";
import { Login } from "../auth/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { ConfigurationsLayouts } from "../../pages/configurations/ConfigurationLayouts";

// Root route utama (tanpa layout langsung)
const rootRoute = createRootRoute();

// Layout utama untuk halaman tertentu
const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "layout",
  component: Layout,
});

// Routes yang menggunakan Layout
const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/",
  component: () => (
    <ProtectedRoute>
      <Homepage />
    </ProtectedRoute>
  ),
});
const searchRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/search",
  component: () => (
    <ProtectedRoute>
      <SearchPage />
    </ProtectedRoute>
  ),
});
const filesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/files",
  component: () => (
    <ProtectedRoute>
      <Homepage />
    </ProtectedRoute>
  ),
});
const classificationRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/classifications",
  component: () => (
    <ProtectedRoute>
      <Homepage />
    </ProtectedRoute>
  ),
});
const configurationRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/configurations",
  component: () => (
    <ProtectedRoute>
      <ConfigurationsLayouts />
    </ProtectedRoute>
  ),
});
const defaultConf = createRoute({
  getParentRoute: () => configurationRoute,
  path: "/configuration",
});

// Route untuk Login (tanpa Layout)
const loginRoute = createRoute({
  getParentRoute: () => rootRoute, // Tidak menggunakan layoutRoute
  path: "/login",
  component: Login,
});

// Gabungkan semua route dalam satu tree
const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    homeRoute,
    searchRoute,
    filesRoute,
    classificationRoute,
    configurationRoute.addChildren([defaultConf]),
  ]),
  loginRoute, // Login tetap di root, jadi tidak pakai layout
]);

export const router = createRouter({
  routeTree,
});
