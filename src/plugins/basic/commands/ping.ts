import { Command } from '@/types'

const command: Command = {
    triggers: ['ping'],
    description: 'Shows bot ping.',
    execute: async(message, Luke, ...args) => {
        const messageTimestamp = Date.now() - message.createdTimestamp
        const messagePing = new Date(messageTimestamp).getMilliseconds()
        const clientPing = Math.round(Luke.ws.ping)

        /*return {
            title: ':ping_pong: ping.',
            fields: [
                ['Message', `${messagePing}ms`, true],
                ['API', `${clientPing}ms`, true]
            ]
        }*/

        message.channel.send('Hello')
    }
}

module.exports = command