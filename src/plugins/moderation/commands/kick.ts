import { Command } from '../../../types'

const config = require('../../../../files/config.json')

const command: Command = {
    triggers: ['kick'],
    description: 'Kick member.',
    usage: '<@user> [reason]',
    permissions: {
      bot: ['KICK_MEMBERS'],
      user: ['KICK_MEMBERS'],
    },
    execute: async(message, ...args) => {
        const member = message.mentions.members?.first()
        
        if (!member) return undefined
        if (!member.kickable) return {
            title: ':x: Error.',
            description: 'You can\'t kick this member.',
            color: config.colors.error
        }

        const reason = args.join(' ').replace(args[0], '').replace(' ', '')

        reason ? member.kick(`${message.author.tag} (${message.author.id}): ${reason}`) : member.kick()
        
        return {
            title: ':door: Member kicked.',
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
