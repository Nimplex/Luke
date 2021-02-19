import { Command } from '../../../types'

const command: Command = {
    triggers: ['binary'],
    description: 'Converts text to binary.',
    usage: [
        {
            name: 'text',
            type: 'text',
            required: true
        }
    ],
    execute: async(message, Luke, ...args) => {
        const text = args.join(' ').split('').map(str => {
            const converted = str.charCodeAt(0).toString(2)
            return converted.padStart(8, '0')
        }).join(' ')
        Luke.embed({
            object: message,
            description: text
        })
    }
}

module.exports = command