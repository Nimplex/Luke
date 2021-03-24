import { Command } from '../../../types'

const command: Command = {
    triggers: ['clapify'],
    description: 'Puts your text between claps.',
    usage: [
        {
            name: 'text',
            type: 'text',
            required: true,
        },
    ],
    execute: async (message, Luke, ...args) => {
        const text = args.join('').split('').join(':clap:')
        Luke.embed({
            object: message,
            description: text,
            disableDescriptionCodeBlock: true,
        })
    },
}

module.exports = command
