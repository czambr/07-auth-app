export interface ICreateSession {
  id: string

  userId: string
  refreshToken: string

  userAgent?: string
  ipAddress?: string
  location?: string
  isActive?: boolean
  expiresAt?: string
}

export interface IUpdateSession {
  id: string

  userId: string
  refreshToken: string

  userAgent?: string
  ipAddress?: string
  location?: string
  isActive?: boolean
  expiresAt?: string
}

export interface IGetAllSessions {
  userId: string
}

export interface IGetSession {
  id: string
  userId: string
}

export interface IGestSessionByParams {
  userId: string
  ip?: string
  userAgent?: string
}
