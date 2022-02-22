enum ErrorCodes {
  INVALID_BODY = "INVALID_BODY",
  SERVER_ERR = "SERVER_ERROR",
}

export const ErrorCodesMeta = {
  INVALID_BODY: { name: "INVALID_BODY", message: "Your request body is not valid." },
  SERVER_ERR: { name: "SERVER_ERROR", message: "Server crashed." },
}

export default ErrorCodes
