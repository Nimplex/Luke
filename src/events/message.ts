import { Message, MessageEmbed } from 'discord.js'
import { Command, Luke } from '../index'

const { prefix } = require('../../files/config.json')

export const _ = async(message: Message, Luke: Luke) => {
  const [commandName, ...args] = message.content.slice(prefix.length).split(/ +/g)
  const command: Command = await Luke.commandHandler.get(commandName)
  if (command) {
    const output = await command.data.execute(message, args)
    const embed = new MessageEmbed()
      .setDescription(output.description)
    message.channel.send(embed)
  }
}