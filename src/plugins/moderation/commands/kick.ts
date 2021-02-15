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
        
        if (!member) {
            const user = await Luke.users.fetch(args[0])
            if (user) {
                message.guild?.members.cache.get(user.id)?.kick(reason)
                Luke.embed({
                    object: message,
                    title: ':doors: Member has been kicked.',
                    fields: [
                        ['Moderator', `${message.author.tag} (${message.author.id})`, true],
                        ['Member', `${user.tag} (${user.id})`, true],
                        ['Reason', reason || 'none']
                    ],
                    color: colors.done
                })
            }
        }
        else {
            if (!member.kickable) Luke.embed({
                object: message,
                description: 'You can\'t kick this member.',
                color: colors.error
            })

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
}

module.exports = command
