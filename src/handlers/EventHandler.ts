import { Luke } from '../'

export default class EventHandler {
    constructor(client: Luke) {
        client.on('ready', () => require('./events/ready')())
        client.on('message', (message) => require('./events/message')(message))
    }
}