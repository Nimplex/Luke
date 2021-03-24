import { Command } from '../../../types'

const command: Command = {
    triggers: ['vaporwave'],
    description: 'Gives your text in weeb style.',
    usage: [
        {
            name: 'text',
            type: 'text',
            required: true,
        },
    ],
    execute: async (message, Luke, ...args) => {
        const text = args
            .join(' ')
            .split('')
            .map((char) => {
                const code = char.charCodeAt(0)
                return code >= 33 && code <= 126
                    ? String.fromCharCode(code - 33 + 65281)
                    : char
            })
            .join('')

        Luke.embed({
            object: message,
            description: text,
        })
    },
}

module.exports = command
