import { PrismaService } from '@modules/prisma/prisma.service'
import { BadRequestException, Injectable } from '@nestjs/common'

import { ICreateUser } from './interfaces'
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

  async update() {}
  async findOne() {}
  async delete() {}
}
