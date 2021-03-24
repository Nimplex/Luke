import { Command } from '../../../types'

const command: Command = {
    triggers: ['hex'],
    description: 'Gives your text in HEX.',
    usage: [
        {
            name: 'text',
            type: 'text',
            required: true,
        },
    ],
    execute: async (message, Luke, ...args) => {
        const text = Buffer.from(args.join(' ')).toString('hex')
        Luke.embed({
            object: message,
            description: text,
        })
    },
}

module.exports = command
