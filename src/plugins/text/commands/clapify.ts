import { Command } from '../../../types'

const command: Command = {
    triggers: ['clapify'],
    description: 'Puts your text between claps.',
    usage: [
        {
            name: 'text',
            type: 'text',
            required: true
        }
    ],
    execute: async(message, Luke, ...args) => {
        const randomizeCase = (word: string) => word.split('').map(c => c.toLowerCase()).join('')
        const text = args.map(randomizeCase).join(':clap:')
        Luke.embed({
            object: message,
            description: text
        })
    }
}

module.exports = command