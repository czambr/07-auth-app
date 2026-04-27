import { Injectable } from '@nestjs/common'
import bcrypt from 'bcrypt'

@Injectable()
export class BcryptService {
  private readonly saltsRounds = 10

  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltsRounds)
    return await bcrypt.hash(data, salt)
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(data, hash)
  }
}
