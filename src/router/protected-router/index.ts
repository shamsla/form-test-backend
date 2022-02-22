import express from "express"
import { ControllersToRoutersRouteCallbackProps } from "../../types/route"
import { attachControllersToRouters } from "../../utils/route"
import controllers from "./controllers"

const routesInfo: ControllersToRoutersRouteCallbackProps[] = []
const apiRouter = attachControllersToRouters(express.Router(), controllers, routeInfo => {
  routesInfo.push(routeInfo)
})

const router = express.Router()
router.use("/api", apiRouter)

export default router
