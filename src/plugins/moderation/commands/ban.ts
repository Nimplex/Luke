import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['ban', 'b'],
    description: 'Ban member.',
    permissions: {
        bot: ['BAN_MEMBERS'],
        user: ['BAN_MEMBERS'],
    },
    usage: [
        {
            name: '@member',
            type: 'mention',
            required: true,
        },
    ],
    execute: async (message, Luke, ...args) => {
        const member = message.mentions.members?.first()
        const reason = args.join(' ').replace(args[0], '').replace(' ', '')

        if (!member) return false

        if (!member.bannable) {
            Luke.embed({
                object: message,
                description: "You can't ban this member.",
                color: colors.error,
            })
            return
        }

        reason
            ? member.ban({
                  reason: `${message.author.tag} (${message.author.id}): ${reason}`,
                  days: 7,
              })
            : member.ban()

        Luke.embed({
            object: message,
            title: ':hammer: Member has been banned.',
            fields: [
                [
                    'Moderator',
                    `${message.author.tag} (${message.author.id})`,
                    true,
                ],
                ['Member', `${member.user.tag} (${member.user.id})`, true],
                ['Reason', reason || 'none'],
            ],
            color: colors.done,
        })
    },
}

module.exports = command
