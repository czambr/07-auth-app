import { Module } from '@nestjs/common'
import { CacheModule } from '@nestjs/cache-manager'
import KeyvRedis from '@keyv/redis'

import { envs } from '@config/envs'
import { PrismaModule } from '@modules/prisma/prisma.module'
import { UsersModule } from '@modules/users/users.module'
import { TestModule } from './modules/test/test.module'
import { BcryptModule } from './modules/bcrypt/bcrypt.module';
import { SessionsModule } from './modules/sessions/sessions.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: () => {
        return {
          ttl: 5000,
          stores: [new KeyvRedis(envs.REDIS_URL)],
        }
      },
    }),

    PrismaModule,
    UsersModule,
    TestModule,
    BcryptModule,
    SessionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
