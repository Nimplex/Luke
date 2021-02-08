import Luke from '../../../index'
import { Command } from '../../../types'

const command: Command = {
    triggers: ['ping'],
    description: 'Shows bot ping.',
    permissions: { bot: ['SEND_MESSAGES'] },
    execute: async(message, ...args) => {
        const messageTimestamp = Date.now() - message.createdTimestamp
        const messagePing = new Date(messageTimestamp).getMilliseconds()
        const clientPing = Math.round(Luke.ws.ping)
        message.channel.send('Hello!')
        return {
            title: ':ping_pong: ping.',
            fields: [
                ['Message', `${messagePing}ms`, true],
                ['API', `${clientPing}ms`, true]
            ]
        }
    }
}

module.exports = command