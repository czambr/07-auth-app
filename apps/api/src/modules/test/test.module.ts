import { Module } from '@nestjs/common'
import { TestController } from './test.controller'

import { UsersModule } from '@modules/users/users.module'
import { BcryptModule } from '@modules/bcrypt/bcrypt.module'
import { TokensModule } from '@modules/tokens/tokens.module'

@Module({
  imports: [UsersModule, BcryptModule, TokensModule],
  controllers: [TestController],
})
export class TestModule {}
