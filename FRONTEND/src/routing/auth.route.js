import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import AuthPage from "../pages/AuthPage"
import { z } from "zod"

export const authRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: AuthPage,
    validateSearch: z.object({
        mode: z.string().optional(),
        redirect: z.string().optional(),
    }),
  })