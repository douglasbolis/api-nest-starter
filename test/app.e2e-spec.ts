import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { AppModule } from '../src/app.module'
import { environments } from '../src/core/utils'
const request = require('supertest')

function router(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS'): string {
  if (path.length > 0 && path[0] === '/') {
    path = path.substr(1)
  }
  return `{${method}} /${environments.API_PREFIX}/${path}`
}

describe('AppController (e2e)', () => {

  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it(router('/ping', 'GET'), () => {
    return request(app.getHttpServer())
      .get(`/ping`)
      .expect(200)
      .expect('pong!')
  })

})