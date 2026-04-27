import { Module } from '@nestjs/common'
import { TestController } from './test.controller'

import { EmailsModule } from '@modules/emails/emails.module'

@Module({
  imports: [EmailsModule],
  controllers: [TestController],
})
export class TestModule {}
