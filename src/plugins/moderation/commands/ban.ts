import { Message, MessageAttachment, MessageEmbed } from 'discord.js'
import Luke, { Command, EmbedOptions } from './../../../index'

export const data: Command['data'] = {
  triggers: ['ban'],
  description: 'Shows bot ping.',
  usage: '<@user> [reason]',
  botPermissions: ['SEND_MESSAGES', 'BAN_MEMBERS'],
  userPermissions: ['BAN_MEMBERS'],
  execute: async(message: Message, ...args: any[]): Promise<EmbedOptions | undefined> => {
    const member = message.mentions.members?.first()
    if (!member) return

    const reason = args.join(' ').replace(args[0], '').replace(' ', '')
    if (reason) {
      member.ban({ reason: `${message.author.tag} (${message.author.id}): ${reason}`, days: 7 })
    } else {
      member.ban()
    }

    return {
      title: ':hammer: ban.',
      fields: [
        ['Moderator', message.author.tag],
        ['Member', member.user.tag],
        ['Reason', reason || 'none', false]
      ]
    }
  }
}