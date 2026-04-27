import { Body, Controller, Post } from '@nestjs/common'

import { type ICreateUser } from '@modules/users/interfaces'
import { UsersService } from '@modules/users/users.service'
import { BcryptService } from '@modules/bcrypt/bcrypt.service'
import { TokensService } from '@modules/tokens/tokens.service'
import { AuthorizationTokenEnum } from '@common/enum'

@Controller('test')
export class TestController {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService,
    private readonly tokenService: TokensService
  ) {}

  @Post()
  async test(@Body() data: ICreateUser) {
    return await this.usersService.create(data)
  }

  @Post('/login')
  async testLogin(@Body() data: ICreateUser) {
    const { password } = data
    const hash = '$2b$10$CTiDvp9Mxpnhx1yEKOigEeMfCR.APhOeod3ufUAf1jJ8v7AvctSf6'
    return await this.bcryptService.compare(password, hash)
  }

  @Post('/generate-token')
  async generateToken() {
    return await this.tokenService.revokeToken({
      type: AuthorizationTokenEnum.CONFIRM_EMAIL,
      userId: 'ad564081-c2f2-4f3e-aaf5-22bdb949e317',
      // token: '5398s36',
    })
  }
}
