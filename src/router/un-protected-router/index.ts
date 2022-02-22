import express from "express"
import { ControllersToRoutersRouteCallbackProps } from "../../types/route"
import { attachControllersToRouters } from "../../utils/route"

import controllers from "./controllers"

const routesInfo: ControllersToRoutersRouteCallbackProps[] = []
const router = attachControllersToRouters(express.Router(), controllers, routeInfo => {
  routesInfo.push(routeInfo)
})

export default router
