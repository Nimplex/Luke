import Luke, { Command } from './../../../index'

export const data: Command['data'] = {
  triggers: ['ban'],
  description: 'Ban member.',
  usage: '<@user> [reason]',
  botPermissions: ['SEND_MESSAGES', 'BAN_MEMBERS'],
  userPermissions: ['BAN_MEMBERS'],
  execute: async(message, ...args) => {
    const member = message.mentions.members?.first()
    
    if (!member) return false
    if (!member.bannable) return {
      title: ':hammer: ban.',
      description: 'You cannot ban this user.',
      color: Luke.colors.error
    }

    const reason = args.join(' ').replace(args[0], '').replace(' ', '')

    reason ? member.ban({ reason: `${message.author.tag} (${message.author.id}): ${reason}`, days: 7 }) : member.ban()
    
    return {
      title: ':hammer: ban.',
      fields: [
        ['Moderator', `${message.author.tag} (${message.author.id})`],
        ['Member', `${member.user.tag} (${member.user.id})`],
        ['Reason', reason || 'none', false]
      ],
      color: Luke.colors.done
    }
  }
}
