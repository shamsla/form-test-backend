import { Request, Response } from "express"
import { ServiceStatuses } from "../../constants/service-constants"
import RegistrationDto from "../../dto/registration-dto"

import UserService from "../../services/User"
import { UserAddDto } from "../../services/User/types"
import { ApiResponse } from "../../utils/api"
import { Controller, Route } from "../../utils/route"

@Controller("/register")
export default class UserAuthController {
  @Route.Post({ path: "/", middlewares: [RegistrationDto.requestRegisterUser] })
  async register(req: Request, res: Response) {
    const dto: UserAddDto = req.body
    const service = new UserService()

    const addResponse = await service.add(dto)

    if (addResponse.status === ServiceStatuses.FAILED) {
      return ApiResponse.returnFailed(res, {
        statusCode: addResponse.statusCode,
        message: addResponse.message,
        data: addResponse.data,
        errorCode: addResponse.errorCode,
      })
    }

    return ApiResponse.returnSuccess(res, {
      statusCode: 201,
      message: "User Registered Successfully.",
      data: {},
    })
  }
}
