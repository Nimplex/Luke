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

        require('./router')(this.app)

        this.app.listen(server.port, () =>
            Console.ready(`Dashboard is listening on port: ${server.port}`)
        )
    }
}