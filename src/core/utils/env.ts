import { config as dotEnvConfig } from 'dotenv'
const logger = require('oh-my-log')
const warn = logger('ENV', {
  prefix: '[%__name:yellow:bold] %__date:yellow - ',
  func: console.warn
})

dotEnvConfig()

function getEnv(key: string) {
  const value = process.env[key]
  if (!value) {
    warn(`Environment ${key} not defined!`)
    return null
  } else {
    return value
  }
}

export const environments = {
  NODE_ENV: getEnv('NODE_ENV') || 'development',
  PORT: getEnv('PORT') || 3000,
  API_PREFIX: getEnv('API_PREFIX') || 'api'
}
