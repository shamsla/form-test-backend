import { ObjectSchema, ValidationError } from "joi"

export async function validateRequestDto({
  dto,
  dtoSchema,
}: {
  dto: Record<string, any>
  dtoSchema: ObjectSchema
}) {
  try {
    const value = await dtoSchema.validateAsync(dto)
    return { error: null, value }
  } catch (error) {
    const { details } = error as ValidationError
    return {
      error: [...details.map(e => ({ message: e.message, path: e.path, type: e.type }))],
      value: null,
    }
  }
}
