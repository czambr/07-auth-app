import { Body, Controller, Post } from '@nestjs/common'

import { type ICreateUser } from '@modules/users/interfaces'
import { UsersService } from '@modules/users/users.service'
import { BcryptService } from '@modules/bcrypt/bcrypt.service'

@Controller('test')
export class TestController {
  constructor(
    private readonly usersService: UsersService,
    private readonly bcryptService: BcryptService
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
}
