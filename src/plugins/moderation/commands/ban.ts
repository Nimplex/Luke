import { Command } from '../../../types'

const config = require('../../../../files/config.json')

const command: Command = {
    triggers: ['ban'],
    description: 'Ban member.',
    usage: '<@user> [reason]',
    permissions: {
      bot: ['BAN_MEMBERS'],
      user: ['BAN_MEMBERS'],
    },
    execute: async(message, ...args) => {
        const member = message.mentions.members?.first()
        
        if (!member) return undefined
        if (!member.bannable) return {
            title: ':x: Error.',
            description: 'You can\'t ban this member.',
            color: config.colors.error
        }

        const reason = args.join(' ').replace(args[0], '').replace(' ', '')

        reason ? member.ban({ reason: `${message.author.tag} (${message.author.id}): ${reason}`, days: 7 }) : member.ban()
        
        return {
            title: ':hammer: Member banned.',
            fields: [
                ['Moderator', `${message.author.tag} (${message.author.id})`, true],
                ['Member', `${member.user.tag} (${member.user.id})`, true],
                ['Reason', reason || 'none']
            ],
            color: config.colors.done
        }
    }
}

module.exports = command
