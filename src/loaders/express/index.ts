import express, { Application } from "express"
import cors from "cors"
import helmet from "helmet"
import bodyParser from "body-parser"

import router from "../../router"

export default async function expressLoader({ app }: { app: Application }) {
  app.use(cors())
  app.use(helmet())

  app.use(express.json())
  app.use(bodyParser.json())

  app.use("/api", router.protectedRouter)
  app.use("/", router.unProtectedRouter)

  return app
}
