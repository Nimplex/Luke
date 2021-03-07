import { Command } from '../../../types'

const command: Command = {
    triggers: ['level'],
    description: 'Shows user\'s global level.',
    usage: [
        {
            name: '@member',
            type: 'mention',
            required: false
        }
    ],
    execute: async(message, Luke, ...args) => {
        const member = message.mentions.members?.first()?.user || message.author
        const user = await Luke.LevelManager.get(member.id)

        const xp = user.experience.toString().split('.')

        Luke.embed({
            object: message,
            title: `${member.username}'s stats`,
            description: `${user.level} - Level\n${xp[0]}${xp[1] ? `.${xp[1].substr(0, 2)}`: ''} - XP\n${user.messagesCount} - Messages`
        })
    }
}

module.exports = command