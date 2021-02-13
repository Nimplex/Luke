import Console from '../modules/Console'
import express from 'express'
import { join } from 'path'

const { server } = require('../../files/config.json')

export default class Server {
    app: express.Application
    
    constructor() {
        this.app = express()

        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.static(join(__dirname, '..', '..', 'public')))
        this.app.set('views', join(__dirname, '..', '..', 'public', 'views'))
        this.app.set('view engine', 'pug')

        this.app.listen(server.port, () => 
            Console.ready(`dashboard is ready, listening to port: ${server.port}`)
        )
    }
}