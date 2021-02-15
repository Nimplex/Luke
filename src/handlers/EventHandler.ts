import { Luke } from '@/index'

export default class EventHandler {
    constructor(Luke: Luke) {
        Luke.on('ready', () => require('./events/ready')(Luke))
        Luke.on('message', (message) => require('./events/message')(Luke, message))
    }
}