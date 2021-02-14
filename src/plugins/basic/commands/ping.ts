import { Command } from '@/types'

const command: Command = {
    triggers: ['ping'],
    description: 'Shows bot ping.',
    /*usage: [
        {
            type: 'number',
            name: 'test',
            required: true
        },
        {
            type: 'number',
            name: 'test'
        }
    ],*/
    execute: async(message, Luke, ...args) => {
        Luke.embed({
            object: message,
            title: ':ping_pong: Pong',
            description: `API: ${Math.floor(Luke.ws.ping)}ms\nMessage: ${Date.now() - message.createdTimestamp}ms`
        })
    }
}

module.exports = command