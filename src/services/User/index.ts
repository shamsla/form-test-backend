import bcrypt from "bcrypt"
import ErrorCodes from "../../constants/error-codes"
import { ServiceFailedResponse, ServiceResponse, ServiceSuccessResponse } from "../../utils/service"
import { User, UserAddDto } from "./types"

const database: User[] = []

export default class UserService {
  async add(data: UserAddDto): Promise<ServiceSuccessResponse<User> | ServiceFailedResponse> {
    try {
      const { email, phone, password, firstName, lastName } = data

      const newObj: User = {
        id: database.length ? (database[database.length - 1].id + 1).toString() : "1",
        password,
        firstName,
        lastName,
        email,
        phone,
      }

      const hashedPassword = await this.hashPassword(password)

      newObj.password = hashedPassword

      database.push(newObj)
      return ServiceResponse.success({ data: newObj, status: 201 })
    } catch (e) {
      return ServiceResponse.failed({ code: ErrorCodes.SERVER_ERR })
    }
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
  }
}
