import 'dotenv/config'
import APIServer from './server'

const appName = '🚜 Brain Agriculture API 🚜'
console.log(appName)
console.log(Array(appName.length).fill('=').join(''))
console.log()
const server = new APIServer()

const PORT = parseInt(process.env.API_PORT || '3000')
server.start(PORT)
