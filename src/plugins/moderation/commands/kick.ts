import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['kick', 'k'],
    description: 'Kick member.',
    permissions: {
        bot: ['KICK_MEMBERS'],
        user: ['KICK_MEMBERS'],
    },
    usage: [
        {
            name: '@member',
            type: 'mention',
            required: true
        }
    ],
    execute: async(message, Luke, ...args) => {
        const member = message.mentions.members?.first()
        const reason = args.join(' ').replace(args[0], '').replace(' ', '')

        if (!member) return false

        if (!member.kickable) {
            Luke.embed({
                object: message,
                description: 'You can\'t kick this member.',
                color: colors.error
            })
            return
        }

        reason ? member.kick(`${message.author.tag} (${message.author.id}): ${reason}`) : member.kick()
        
        Luke.embed({
            object: message,
            title: ':hammer: Member has been kicked.',
            fields: [
                ['Moderator', `${message.author.tag} (${message.author.id})`, true],
                ['Member', `${member.user.tag} (${member.user.id})`, true],
                ['Reason', reason || 'none']
            ],
            color: colors.done
        })
    }
}

module.exports = command
