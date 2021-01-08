import { Message } from 'discord.js'
import { EmbedOptions } from './../../../index'

export const data = {
  triggers: ['test'],
  description: '',
  usage: '',
  dev: false,
  execute: async(message: Message, ...args: any[]): Promise<EmbedOptions> => {
    return { 
      title: 'Test',
      fields: [
        ['Arguments', args]
      ]
    }
  }
}