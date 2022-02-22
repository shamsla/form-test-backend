import { Response } from "express"
import {
  ApiResponseSuccessProps,
  ApiResponseReturnProps,
  ApiResponseFailedProps,
  ApiResponseFailedReturn,
  ApiResponseSuccessReturn,
} from "../types/api"

export class ApiResponse {
  static success({
    statusCode = 200,
    message,
    data,
  }: ApiResponseSuccessProps): ApiResponseSuccessReturn {
    return { status: 1, status_code: statusCode, message, data }
  }

  static failed({
    statusCode,
    message,
    errorCode,
    data,
  }: ApiResponseFailedProps): ApiResponseFailedReturn {
    return { status: 0, status_code: statusCode, message, error_code: errorCode, data }
  }

  static return({ res, data }: ApiResponseReturnProps) {
    return res.status(data.status_code).json(data)
  }

  static returnSuccess(res: Response, data: ApiResponseSuccessProps) {
    return this.return({ res, data: this.success(data) })
  }

  static returnFailed(res: Response, data: ApiResponseFailedProps) {
    return this.return({ res, data: this.failed(data) })
  }
}

export default { ApiResponse }
