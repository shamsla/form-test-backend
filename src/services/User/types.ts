export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: number
  password: string
}

export interface UserAddDto {
  firstName: string
  lastName: string
  email: string
  phone: number
  password: string
}
