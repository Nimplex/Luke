import { Message } from 'discord.js'
import { Command, Luke } from '../index'
import EmbedHandler from '../handlers/embed'

export const _ = async(message: Message, Luke: Luke) => {
  if (!message.content.startsWith(Luke.config.prefix) || !message.guild || message.author.bot) return
  
  const [commandName, ...args] = message.content.slice(Luke.config.prefix.length).split(/ +/g)
  const command: Command = await Luke.commandHandler.get(commandName)
  
  if (command) {
    if (command.data.dev && !Luke.config.developers.includes(message.author.id)) return
    if (!message.guild?.me?.permissions.has(command.data.botPermissions || [])) {
      let missing: any[] = []
      command.data.botPermissions?.forEach(permission => {
        if (!message.guild?.me?.permissions.has(permission)) missing.push(permission)
      })
      const embed = await EmbedHandler(
        { title: 'Error, i\'m missing permissions.', 
          fields: [['Required permissions', missing.join(', ').toLowerCase().replace(/_/gm, ' ')]], 
          color: Luke.colors.error 
        }, message, Luke)
      message.channel.send(embed); return
    }
    if (!message.member?.permissions.has(command.data.userPermissions || [])) {
      let missing: any[] = []
      command.data.userPermissions?.forEach(permission => {
        if (!message.member?.permissions.has(permission)) missing.push(permission)
      })
      const embed = await EmbedHandler(
        { title: 'Error, you\'re missing permissions.', 
          fields: [['Required permissions', missing.join(', ').toLowerCase().replace(/_/gm, ' ')]], 
          color: Luke.colors.error 
        }, message, Luke)
      message.channel.send(embed); return
    }
    
    const output = await command.data.execute(message, ...args)

    if (output == false) {
      const embed = await EmbedHandler({ title: 'Error, missing valid arguments.', fields: [[`Usage`, command.data.usage]], color: Luke.colors.error }, message, Luke)
      message.channel.send(embed)
    }
    else if (!output) return
    else {
      const embed = await EmbedHandler(output, message, Luke)
      message.channel.send(embed)
    }
  }
}
