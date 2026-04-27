import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

import { ICreateToken, IPayloadToken, IRevokeToken } from './interfaces'
import { AuthorizationTokenEnum } from '@common/enum'

@Injectable()
export class TokensService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private readonly randomToken = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  private readonly getKey = ({
    type,
    userId,
  }: {
    type: AuthorizationTokenEnum
    userId: string
  }) => {
    return `token:${type}:user:${userId}`
  }

  async generateToken(data: ICreateToken) {
    try {
      const { userId, type, ttl = 900000 } = data
      const token = this.randomToken()
      const keyRedis = this.getKey({ type, userId })
      return await this.cacheManager.set(
        keyRedis,
        {
          userId,
          type,
          token,
        },
        ttl
      )
    } catch {
      throw new BadRequestException('There was an error')
    }
  }

  async validateToken(dataToken: IPayloadToken) {
    try {
      const { userId, token, type } = dataToken
      const keyRedis = this.getKey({ type, userId })
      const payload = await this.cacheManager.get<IPayloadToken>(keyRedis)

      if (!payload || payload.token !== token) {
        throw new UnauthorizedException('Invalid or expired token')
      }

      return payload
    } catch {
      throw new BadRequestException('There was an error')
    }
  }

  async revokeToken(data: IRevokeToken) {
    const { userId, type } = data

    try {
      const keyRedis = this.getKey({ type, userId })
      return await this.cacheManager.del(keyRedis)
    } catch {
      throw new BadRequestException('There was an error')
    }
  }
}
