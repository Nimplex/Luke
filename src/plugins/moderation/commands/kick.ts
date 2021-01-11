import Luke, { Command } from './../../../index'

export const data: Command['data'] = {
  triggers: ['kick'],
  description: 'Kick member from your server.',
  usage: '<@user> [reason]',
  botPermissions: ['SEND_MESSAGES', 'KICK_MEMBERS'],
  userPermissions: ['KICK_MEMBERS'],
  execute: async(message, ...args) => {
    const member = message.mentions.members?.first()

    if (!member) return false
    if (!member.kickable) return {
      title: ':door: kick.',
      description: 'You cant kick this user.',
      color: Luke.colors.error
    }

    const reason = args.slice(1).join(" ")

    reason ? member.kick(reason) : member.kick()

    return {
      title: ':door: kick.',
      fields: [
        ['Moderator', `${message.author.tag} (${message.author.id})`],
        ['Member', `${member.user.tag} (${member.user.id})`],
        ['Reason', reason || 'none', false]
      ],
      color: Luke.colors.done
    }
  }
}