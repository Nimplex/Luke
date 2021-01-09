import { Message } from 'discord.js'
import Luke, { EmbedOptions, Command } from './../../../index'

export const data: Command['data'] = {
  triggers: ['test'],
  description: '',
  usage: '',
  dev: true,
  userPermissions: ['ADMINISTRATOR', 'ATTACH_FILES'],
  execute: async(message: Message, ...args: any[]): Promise<EmbedOptions | undefined> => {
    return { 
      title: 'Test',
      color: Luke.colors.default,
      description: 'Test description',
      fields: [
        ['Arguments', ` ${args}`],
        ['Author id', message.author.id]
      ],
      timestamp: new Date(),
      url: 'https://nimplex.xyz',
      author: { text: message.author.username, icon: message.author.displayAvatarURL() },
      image: 'https://nimplex.xyz/assets/logobg-512.png',
      thumbnail: 'https://nimplex.xyz/assets/logobg-512.png',
      footer: `Invoked by: ${message.author.id}`
    }
  }
}