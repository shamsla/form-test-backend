import Joi from "joi"

export function isStringEmail(text: string) {
  try {
    Joi.assert(text, Joi.string().email())
    return true
  } catch {
    return false
  }
}
