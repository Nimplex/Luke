import { Message, MessageAttachment, MessageEmbed } from 'discord.js'
import Luke, { Command, EmbedOptions } from './../../../index'

export const data: Command['data'] = {
  triggers: ['kick'],
  description: 'Kick member from your server.',
  usage: '<@user> [reason]',
  botPermissions: ['SEND_MESSAGES', 'KICK_MEMBERS'],
  userPermissions: ['KICK_MEMBERS'],
  execute: async(message: Message, ...args: any[]): Promise<EmbedOptions | undefined> => {
      
    const member = message.mentions.members?.first()

    if (!member) return 

    if (!member.kickable) return {

      title: ':doors: kick.',
      description: 'You cant kick this user.',
      color: Luke.colors.error

    }

    const reason = args.slice(1).join(" ")

    reason ? member.kick(reason) : member.kick()

    return {

      title: ':doors: kick.',

      fields: [

        ['Moderator', `${message.author.tag} (${message.author.id})`],
        ['Member', `${member.user.tag} (${member.user.id})`],
        ['Reason', reason || 'none', false]
      ],

      color: Luke.colors.done

    }
  }
}