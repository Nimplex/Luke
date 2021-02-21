import { Command } from '../../../types'

const command: Command = {
    triggers: ['howgay'],
    description: 'Shows gay % of user.',
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
            description: `:gay_pride_flag: **${thing}** is ${Math.floor(Math.random() * 100)}% gay.`,
            disableDescriptionCodeBlock: true
        })
    }
}

module.exports = command