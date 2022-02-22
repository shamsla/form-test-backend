import ErrorCodes, { ErrorCodesMeta } from "../constants/error-codes"
import { ServiceStatuses } from "../constants/service-constants"

export interface ServiceFailedResponse {
  status: ServiceStatuses.FAILED
  statusCode: number
  errorCode: ErrorCodes
  data: Record<string, any>
  message: string
}
export interface ServiceSuccessResponse<D = Record<string, any>> {
  status: ServiceStatuses.SUCCESS
  statusCode: number
  data: D
}

export class ServiceResponse {
  static success<DT = Record<string, any>>({
    data,
    status = 200,
  }: {
    data?: DT
    status?: number
  }): ServiceSuccessResponse<DT> {
    return { status: ServiceStatuses.SUCCESS, data: data || ({} as DT), statusCode: status }
  }

  static failed({
    code,
    data,
    message,
    status = 500,
  }: {
    code: ErrorCodes
    message?: string
    data?: Record<string, any>
    status?: number
  }): ServiceFailedResponse {
    const errorCodeName = code as keyof typeof ErrorCodesMeta
    const responseMessage = message || ErrorCodesMeta[errorCodeName]?.message
    return {
      status: ServiceStatuses.FAILED,
      errorCode: code,
      data: data || {},
      message: responseMessage || "",
      statusCode: status,
    }
  }
}
