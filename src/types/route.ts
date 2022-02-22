import { Handler } from "express"

import { RouteMethods } from "../constants/route"

export interface RouteDecoratorProps {
  path: `/${string}`
  method: RouteMethods
  middlewares: Handler[]
  handler: string | symbol
}

export interface ControllersToRoutersRouteCallbackProps {
  path: string
  handler: string
}
