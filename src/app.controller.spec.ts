import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'

describe('AppController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile()
  })

  describe('root', () => {
    it('ping return "pong!"', () => {
      const appController = app.get<AppController>(AppController)
      expect(appController.ping()).toBe('pong!')
    })
  })

})