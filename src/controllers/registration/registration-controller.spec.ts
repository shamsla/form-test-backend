import "reflect-metadata"
import request from "supertest"
import { Application } from "express"
import loaders from "../../loaders"
import { ApiResponse } from "../../utils/api"

let app: Application
beforeAll(async () => {
  app = await loaders.expressLoaderTest()
})

describe("Registration Controller: /register", () => {
  describe("POST /register", () => {
    it("should register user", async () => {
      const payload = {
        first_name: "shams",
        last_name: "latif",
        email: "shams@shams.com",
        phone: "923011111111",
        password: "Random_password1234$",
      }
      return request(app)
        .post("/register")
        .send(payload)
        .expect("Content-Type", /json/)
        .then(res => {
          const apiResponse = ApiResponse.success({
            statusCode: 201,
            message: "User Registered Successfully.",
            data: {},
          })

          expect(res.body).toEqual(expect.objectContaining(apiResponse))
        })
    })
  })
})
