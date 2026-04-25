import { Module } from "@nestjs/common"
import { CacheModule } from "@nestjs/cache-manager"
import KeyvRedis from "@keyv/redis"

import { envs } from "./config"
import { PrismaModule } from "./modules/prisma/prisma.module"

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
