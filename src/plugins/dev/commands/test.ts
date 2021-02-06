import Luke, { Command } from './../../../index'

export const data: Command['data'] = {
  triggers: ['test'],
  description: '',
  dev: true,
  execute: async(message, ...args) => {
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