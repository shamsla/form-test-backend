import Joi from "joi"

export default {
  registerUser: Joi.object({
    first_name: Joi.string().min(1).max(100).required(),
    last_name: Joi.string().min(1).max(100).required(),
    email: Joi.string().min(2).max(200).email({}).required(),
    phone: Joi.string().min(12).max(12).pattern(/\d+/).required(),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .required(),
  }),
}
