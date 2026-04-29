import { AuthProviderEnum, UserStatusEnum } from 'prisma/generated/enums'

export interface ICreateUser {
  name?: string
  lastName?: string
  avatar?: string
  email: string
  backupEmail?: string
  phone?: string
  password: string
  country?: string
  language?: string

  emailConfirm?: boolean
  backupEmailConfirm?: boolean
  phoneConfirm?: boolean

  twoFactorEnabled?: boolean
  twoFactorSecret?: string

  status?: UserStatusEnum
  authProvider?: AuthProviderEnum
}

export interface IUpdateUser {
  id: string
  name?: string
  lastName?: string
  avatar?: string
  email?: string
  backupEmail?: string
  phone?: string
  password?: string
  country?: string
  language?: string

  emailConfirm?: boolean
  backupEmailConfirm?: boolean
  phoneConfirm?: boolean

  twoFactorEnabled?: boolean
  twoFactorSecret?: string

  status?: UserStatusEnum
  authProvider?: AuthProviderEnum
}

export interface IGetUser {
  id?: string
  email?: string
}
