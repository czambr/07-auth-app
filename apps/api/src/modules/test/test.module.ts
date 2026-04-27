import { Module } from '@nestjs/common'
import { TestController } from './test.controller'

import { UsersModule } from '@modules/users/users.module'
import { BcryptModule } from '@modules/bcrypt/bcrypt.module'

@Module({
  imports: [UsersModule, BcryptModule],
  controllers: [TestController],
})
export class TestModule {}
