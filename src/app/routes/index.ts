import { Router } from "express";
import { usersRoute } from "../modules/user/user.routes";
import { AuthRoute } from "../modules/auth/auth.route";
import { houseRoute } from "../modules/house/house.route";

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: usersRoute
    },
    {
        path: '/auth',
        route: AuthRoute
    },
    {
        path: '/houses',
        route: houseRoute
    }

]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router