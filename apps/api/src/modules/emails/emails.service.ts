import { BadRequestException, Injectable } from '@nestjs/common'
import { Resend } from 'resend'
import { IEmail } from './interfaces'
import { envs } from '@config/envs'

@Injectable()
export class EmailsService {
  private readonly resend: Resend

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY)
  }

  async sendEmail(data: IEmail) {
    const { to, subject, html } = data

    try {
      return await this.resend.emails.send({
        from: `Acme <${envs.RESEND_FROM_EMAIL}>`,
        to,
        subject,
        html,
      })
    } catch {
      throw new BadRequestException('There was an error')
    }
  }

  async sendBatchEmail(emails: IEmail[]) {
    return await this.resend.batch.send(
      emails.map(({ to, html, subject }) => ({
        from: `Acme <${envs.RESEND_FROM_EMAIL}>`,
        to,
        subject,
        html,
      }))
    )
  }
}
