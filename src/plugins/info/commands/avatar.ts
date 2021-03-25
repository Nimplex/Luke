import { Command } from '../../../types'

const command: Command = {
    triggers: ['avatar'],
    description: 'Shows user\'s avatar.',
    usage: [
        {
            name: '@member',
            type: 'mention'
        }
    ],
    execute: async(message, Luke, ...args) => {
        const member = message.mentions.members?.first()?.user || message.author

        Luke.embed({
            object: message,
            title: `${member.username}'s avatar.`,
            image: member.displayAvatarURL({ dynamic: true })
        })
    }
}

module.exports = command