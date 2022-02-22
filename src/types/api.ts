import { Request, Response } from "express"
import ErrorCodes from "../constants/error-codes"
import { User } from "../services/User/types"

export interface ApiResponseSuccessProps {
  statusCode?: number
  message: string
  data: Record<string, any>
}

export interface ApiResponseSuccessReturn {
  status: 1
  status_code: number
  message: string
  data: Record<string, any>
}

export interface ApiResponseFailedProps {
  statusCode: number
  errorCode: ErrorCodes
  message: string
  data: Record<string, any>
}

export interface ApiResponseFailedReturn {
  status: 0
  status_code: number
  message: string
  error_code: ErrorCodes
  data: Record<string, any>
}

export interface ApiResponseReturnProps {
  res: Response
  data: Required<ApiResponseSuccessReturn> | Required<ApiResponseFailedReturn>
}

export interface ExtendedRequest extends Request {
  user: User
}
