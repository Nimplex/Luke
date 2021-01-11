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
      description: 'You can\'t kick this user.',
      color: Luke.colors.error
    }

    const reason = args.slice(1).join(" ")

    reason ? member.kick(reason) : member.kick()

    return {
      title: ':door: kick.',
      fields: [
        ['Moderator', `${message.author.tag} (${message.author.id})`, true],
        ['Member', `${member.user.tag} (${member.user.id})`, true],
        ['Reason', reason || 'none']
      ],
      color: Luke.colors.done
    }
  }
}