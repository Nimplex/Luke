import { Command } from '../../../types'

const command: Command = {
    triggers: ['reverse'],
    description: 'Gives your text but reversed.',
    usage: [
        {
            name: 'text',
            type: 'text',
            required: true,
        },
    ],
    execute: async (message, Luke, ...args) => {
        const text = args.join(' ').split('').reverse().join('')
        Luke.embed({
            object: message,
            description: text,
        })
    },
}

module.exports = command
