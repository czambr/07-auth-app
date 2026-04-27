import { AuthorizationTokenEnum } from '@common/enum'

export interface ICreateToken {
  userId: string
  type: AuthorizationTokenEnum
  ttl?: number
}

export interface IPayloadToken {
  userId: string
  type: AuthorizationTokenEnum
  token: string
}

export interface IRevokeToken {
  userId: string
  type: AuthorizationTokenEnum
}

export interface ITokenResponse {
  token: string
}
