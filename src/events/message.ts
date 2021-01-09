import { Message } from 'discord.js'
import { Command, Luke } from '../index'
import EmbedHandler from '../handlers/embed'

export const _ = async(message: Message, Luke: Luke) => {
  const [commandName, ...args] = message.content.slice(Luke.config.prefix.length).split(/ +/g)
  const command: Command = await Luke.commandHandler.get(commandName)
  if (command) {
    const output = await command.data.execute(message, ...args)
    
    if (command.data.dev && !Luke.config.developers.includes(message.author.id)) return
    if (!message.guild?.me?.permissions.has(command.data.botPermissions || [])) return
    if (!message.member?.permissions.has(command.data.userPermissions || [])) return

    if (output) EmbedHandler(output, message, Luke)
  }
}