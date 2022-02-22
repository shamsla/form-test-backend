import { NextFunction, Request, Response } from "express"
import ErrorCodes, { ErrorCodesMeta } from "../../constants/error-codes"
import { UserAddDto } from "../../services/User/types"
import { ApiResponse } from "../../utils/api"
import { validateRequestDto } from "../../utils/dto"
import schema from "./user-dto.schema"

export default class RegistrationDto {
  static async requestRegisterUser(req: Request, res: Response, next: NextFunction) {
    const { error, value } = await validateRequestDto({
      dto: req.body,
      dtoSchema: schema.registerUser,
    })

    if (error) {
      return ApiResponse.returnFailed(res, {
        statusCode: 400,
        message: ErrorCodesMeta.INVALID_BODY.message,
        errorCode: ErrorCodes.INVALID_BODY,
        data: { body: error },
      })
    }

    const dto: UserAddDto = {
      firstName: value.first_name,
      lastName: value.last_name,
      phone: value.phone,
      email: value.email,
      password: value.password,
    }

    req.body = dto

    return next()
  }
}
