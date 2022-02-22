import UserService from "."
import { ServiceResponse } from "../../utils/service"
import { User, UserAddDto } from "./types"

describe("User Service", () => {
  const service = new UserService()

  describe("Add User: User.add()", () => {
    it("should register a user", async () => {
      const userObj: UserAddDto = {
        firstName: "shams",
        lastName: "latif",
        email: "shams@shams.com",
        phone: 923011111111,
        password: "1234",
      }

      const resObj: User = {
        id: expect.any(String),
        firstName: "shams",
        lastName: "latif",
        email: "shams@shams.com",
        phone: 923011111111,
        password: expect.any(String),
      }

      const res = await service.add(userObj)

      expect(res).toBeDefined()
      expect(res).toEqual(ServiceResponse.success({ data: resObj, status: 201 }))
    })
  })
})
