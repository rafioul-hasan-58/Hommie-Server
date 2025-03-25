import { Router } from "express";
import { usersRoute } from "../modules/user/user.routes";
import { AuthRoute } from "../modules/auth/auth.route";
import { listingRoute } from "../modules/listing/listing.route";

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
        path:'/listings',
        route:listingRoute
    }

]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router