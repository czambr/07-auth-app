import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@modules/prisma/prisma.service'
import {
  ICreateSession,
  IGetAllSessions,
  IGetSession,
  IUpdateSession,
} from './interfaces'

@Injectable()
export class SessionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(sessionData: ICreateSession) {
    return this.prisma.session.create({
      data: sessionData,
    })
  }

  async getAll({ userId }: IGetAllSessions) {
    return this.prisma.session.findMany({
      where: { userId },
      select: {
        id: true,
        userId: true,
        userAgent: true,
        createdAt: true,
        lastUsedAt: true,
      },
    })
  }

  async findOne(sessionData: IGetSession) {
    const { id, userId } = sessionData
    const session = await this.prisma.session.findUnique({
      where: { id, userId },
    })

    if (!session) {
      throw new NotFoundException('Session not found')
    }

    return session
  }

  async update(sessionData: IUpdateSession) {
    const {
      id,
      userId,
      userAgent,
      ipAddress,
      refreshToken,
      isActive,
      location,
      expiresAt,
    } = sessionData

    await this.findOne({ id, userId })
    return await this.prisma.session.update({
      where: { id, userId },
      data: {
        userAgent,
        ipAddress,
        refreshToken,
        isActive,
        location,
        expiresAt,
      },
    })
  }

  async delete(sessionData: IGetSession) {
    const { id, userId } = sessionData
    await this.findOne(sessionData)

    await this.prisma.session.delete({
      where: { id, userId },
    })
  }

  async deleteAll(dataSession: IGetAllSessions) {
    const { userId } = dataSession
    return await this.prisma.session.deleteMany({
      where: { userId },
    })
  }
}
