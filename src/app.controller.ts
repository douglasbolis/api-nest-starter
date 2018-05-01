import { All, Controller } from '@nestjs/common'

@Controller()
export class AppController {
  @All('ping')
  ping(): string {
    return 'pong!'
  }
}