import {
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import { Layout } from "../Layout";
import { Homepage } from "../../pages/Homepage";

// 1️⃣ Definisikan Root Route
const rootRoute = createRootRoute({
  component: Layout,
});

// 2️⃣ Definisikan Child Routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Homepage,
});

// 3️⃣ Gabungkan Semua Routes
const routeTree = rootRoute.addChildren([homeRoute]);

// 4️⃣ Buat Router
export const router = createRouter({ routeTree });
