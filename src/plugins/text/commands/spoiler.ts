import { Command } from '../../../types'

const command: Command = {
    triggers: ['spoiler'],
    description: 'Gives your text but in annoying spoilers.',
    usage: [
        {
            name: 'text',
            type: 'text',
            required: true
        }
    ],
    execute: async(message, Luke, ...args) => {
        const ftext = args.join(' ')
        let text = ''
        ftext.split('').forEach(t => text += `||${t}||`)
        Luke.embed({
            object: message,
            description: text
        })
    }
}

module.exports = command