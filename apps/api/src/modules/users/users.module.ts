import { Module } from '@nestjs/common'

import { PrismaModule } from '@modules/prisma/prisma.module'
import { UsersService } from './users.service'
import { BcryptModule } from '@modules/bcrypt/bcrypt.module'

@Module({
  imports: [PrismaModule, BcryptModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
