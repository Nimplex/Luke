import { Message } from 'discord.js'
import Luke, { Command, EmbedOptions } from './../../../index'

export const data: Command['data'] = {
  triggers: ['ping'],
  description: 'Shows bot ping.',
  usage: '',
  botPermissions: ['SEND_MESSAGES'],
  execute: async(message: Message, ...args: any[]): Promise<EmbedOptions | undefined> => {
    const messageTimestamp = Date.now() - message.createdTimestamp
    const messagePing = new Date(messageTimestamp).getMilliseconds()
    const clientPing = Math.round(Luke.ws.ping)
    return {
      title: ':ping_pong: ping.',
      fields: [
        ['Message', `${messagePing}ms`],
        ['API', `${clientPing}ms`]
      ]
    }
  }
}