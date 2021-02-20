import { Command } from '../../../types'

const command: Command = {
    triggers: ['iq'],
    description: 'Shows user\'s iq.',
    usage: [
        {
            name: 'mention',
            type: 'mention'
        }
    ],
    execute: async(message, Luke, ...args) => {
        const thing = message.mentions.members?.first() || args.join(' ') || message.member
        Luke.embed({
            object: message,
            description: `:bulb: ${thing} has ${Math.floor(Math.random() * 200)} iq.`,
            disableDescriptionCodeBlock: true
        })
    }
}

module.exports = command