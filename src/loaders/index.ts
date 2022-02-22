import express, { Application } from "express"
import expressLoader from "./express"

export default {
  expressLoader,
  expressLoaderTest: () => expressLoader({ app: express() }),

  init: async ({ expressApp }: { expressApp: Application }) => {
    await expressLoader({ app: expressApp })
  },
}
