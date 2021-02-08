import { Luke } from '../'

import Ready from './events/ready'
import Message from './events/message'

export default class EventHandler {
    constructor(client: Luke) {
        client.on('ready', () => Ready(client))
        client.on('message', (message) => Message(client, message))
    }
}