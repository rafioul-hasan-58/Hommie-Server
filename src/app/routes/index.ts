import { Router } from "express";
import { usersRoute } from "../modules/user/user.routes";
import { AuthRoute } from "../modules/auth/auth.route";

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: usersRoute
    },
    {
        path: '/auth',
        route: AuthRoute
    }

]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router