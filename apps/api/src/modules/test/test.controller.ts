import { Body, Controller, Post } from '@nestjs/common'

import { EmailsService } from '@modules/emails/emails.service'

@Controller('test')
export class TestController {
  constructor(private readonly emailService: EmailsService) {}

  @Post()
  async test() {
    return await this.emailService.sendBatchEmail([
      {
        to: [''],
        subject: 'Prueba2',
        html: 'Hey bro! <strong>it works!</strong>',
      },
      {
        to: [''],
        subject: 'Prueba3',
        html: 'Hey bro! <strong>it works!</strong>',
      },
    ])
  }
}
