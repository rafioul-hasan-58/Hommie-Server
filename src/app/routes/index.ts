import { Router } from "express";
import { usersRoute } from "../modules/user/user.routes";

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: usersRoute
    },
   
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router