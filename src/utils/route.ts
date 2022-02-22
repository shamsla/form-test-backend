import express, { Handler, IRouter } from "express"
import { MetadataKeys, RouteMethods } from "../constants/route"
import { ControllersToRoutersRouteCallbackProps, RouteDecoratorProps } from "../types/route"

export const Controller =
  (basePath: string): ClassDecorator =>
  target => {
    Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target)
  }

const routeMethodDecoratorFactory =
  (method: RouteMethods) =>
  // returns a decorate based on the method
  ({ path, middlewares = [] }: { path: `/${string}`; middlewares?: Handler[] }): MethodDecorator =>
  // decorator target function: in this scenario its a class method
  (target, propertyKey) => {
    const controllerClass = target.constructor

    // if there are already some routes then return those else return empty array
    const routes: RouteDecoratorProps[] = Reflect.hasMetadata(MetadataKeys.ROUTERS, controllerClass)
      ? Reflect.getMetadata(MetadataKeys.ROUTERS, controllerClass)
      : []

    routes.push({
      method,
      path,
      middlewares,
      handler: propertyKey,
    })

    Reflect.defineMetadata(MetadataKeys.ROUTERS, routes, controllerClass)
  }

export const Route = {
  Get: routeMethodDecoratorFactory(RouteMethods.GET),
  Post: routeMethodDecoratorFactory(RouteMethods.POST),
  Put: routeMethodDecoratorFactory(RouteMethods.PUT),
  Delete: routeMethodDecoratorFactory(RouteMethods.DELETE),
}

export function attachControllersToRouters(
  expressRouter: IRouter,
  controllers: any[],
  callback?: (data: ControllersToRoutersRouteCallbackProps) => void
) {
  controllers.forEach(ControllerClass => {
    const controllerInstance: { [handler: string]: Handler } = new ControllerClass()
    const basePath: string = Reflect.getMetadata(MetadataKeys.BASE_PATH, ControllerClass)
    const controllerInstanceRoutes: RouteDecoratorProps[] = Reflect.getMetadata(
      MetadataKeys.ROUTERS,
      ControllerClass
    )

    const controllerRouter = express.Router()

    controllerInstanceRoutes.forEach(instanceRoute => {
      const { path, method, middlewares, handler } = instanceRoute
      controllerRouter[method](path, ...middlewares, controllerInstance[String(handler)]).bind(
        controllerInstance
      )

      // if callback then pass then route info
      if (callback) {
        callback({
          path: `${method.toUpperCase()} ${basePath === "/" ? "" : basePath}${path}`,
          handler: `${ControllerClass.name}.${String(handler)}`,
        })
      }
    })

    expressRouter.use(basePath, controllerRouter)
  })

  return expressRouter
}

export default { attachControllersToRouters, Controller, Route }
