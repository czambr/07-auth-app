import { NestFactory } from "@nestjs/core"
import { Logger, ValidationPipe, VersioningType } from "@nestjs/common"
import cookieParser from "cookie-parser"

import { envs } from "./config"
import { AppModule } from "./app.module"

async function bootstrap() {
  const logger = new Logger("App - Auth")

  const app = await NestFactory.create(AppModule)

  // app.use(helmet());
  app.use(cookieParser())
  app.setGlobalPrefix("api")
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  })
  app.enableCors({
    origin: envs.ALLOWED_ORIGINS,
    credentials: true, // Permite cookies
    // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization'],
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )

  await app.listen(envs.PORT)
  logger.log("App running on PORT:" + envs.PORT)
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
