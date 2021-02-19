import { Command } from '../../../types'

const command: Command = {
    triggers: ['space'],
    description: 'Gives your text spaced out.',
    usage: [
        {
            name: 'text',
            type: 'text',
            required: true
        }
    ],
    execute: async(message, Luke, ...args) => {
        const text = args.join(' '.repeat(2 / 2)).split('').join(' '.repeat(2))
        Luke.embed({
            object: message,
            description: text
        })
    }
}

module.exports = command