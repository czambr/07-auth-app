import { PrismaService } from '@modules/prisma/prisma.service'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { ICreateUser, IGetUser, IUpdateUser } from './interfaces'
import { BcryptService } from '@modules/bcrypt/bcrypt.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bcryptService: BcryptService
  ) {}

  private async validateEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { email: true },
    })

    if (!user) {
      return
    }

    throw new BadRequestException('The user is already exist')
  }

  async create(newUser: ICreateUser) {
    const {
      name,
      lastName,
      avatar,
      email,
      backupEmail,
      phone,
      password,
      country,
      language,

      emailConfirm,
      backupEmailConfirm,
      phoneConfirm,

      twoFactorEnabled,
      twoFactorSecret,
      status,
      authProvider,
    } = newUser

    const planeEmail = email.toLocaleLowerCase()
    await this.validateEmail(planeEmail)

    return await this.prisma.user.create({
      data: {
        name,
        lastName,
        avatar,
        email: planeEmail,
        backupEmail,
        phone,
        password: await this.bcryptService.hash(password),
        country,
        language,
        emailConfirm,
        backupEmailConfirm,
        phoneConfirm,
        twoFactorEnabled,
        twoFactorSecret,
        status,
        authProvider,
      },
    })
  }

  async findOne(userData: IGetUser) {
    const user = await this.prisma.user.findUnique({
      where: { id: userData.id, email: userData.email },
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async update(userData: IUpdateUser) {
    const { id, password, email, ...data } = userData
    await this.findOne({ id })

    if (email) {
      await this.validateEmail(email)
    }

    return await this.prisma.user.update({
      where: { id },
      data: {
        ...data,
        password: password && (await this.bcryptService.hash(password)),
        email: email && email,
      },
    })
  }

  async delete(id: string) {
    await this.findOne({ id })
    return await this.prisma.user.delete({
      where: { id },
    })
  }
}
