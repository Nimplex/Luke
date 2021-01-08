import { Message } from 'discord.js'
import { Command, Luke } from '../index'
import EmbedHandler from '../handlers/embed'

const { prefix, developers } = require('../../files/config.json')

export const _ = async(message: Message, Luke: Luke) => {
  const [commandName, ...args] = message.content.slice(prefix.length).split(/ +/g)
  const command: Command = await Luke.commandHandler.get(commandName)
  if (command) {
    const output = await command.data.execute(message, ...args)
    
    if (command.data.dev && !developers.includes(message.author.id)) return

    EmbedHandler(output, message, Luke)
  }
}