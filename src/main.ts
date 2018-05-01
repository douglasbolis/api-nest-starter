import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { environments } from './core/utils'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix(environments.API_PREFIX)
  await app.listen(3000)
}

bootstrap()