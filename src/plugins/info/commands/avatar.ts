import { Command } from '../../../types'

const command: Command = {
    triggers: ['avatar'],
    description: 'Shows user\'s avatar.',
    usage: '[@user]',
    execute: async(message, ...args) => {
        const member = message.mentions.members?.first()?.user || message.author

        return {
            title: `${member.username}'s avatar.`,
            image: member.displayAvatarURL({ dynamic: true })
        }
    }
}

module.exports = command