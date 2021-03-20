import { Command } from '../../../types'

const command: Command = {
    triggers: ['choose'],
    description: 'Chooses random item.',
    usage: [
        {
            name: 'item,',
            type: 'text'
        },
        {
            name: 'item,',
            type: 'text'
        },
        {
            name: 'items',
            type: 'text'
        }
    ],
    execute: async(message, Luke, ...args) => {
        const items = args.join(' ').split(',')
        if (!items[1]) return false
        message.channel.send(items[Math.floor(Math.random() * items.length)])
    }
}

module.exports = command