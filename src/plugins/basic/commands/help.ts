import { Message } from 'discord.js'
import Luke, { Command, EmbedOptions, Plugin } from './../../../index'

export const data: Command['data'] = {
  triggers: ['help'],
  description: 'Get all commands from category or view informations about single command.',
  usage: '[command|category]',
  botPermissions: ['SEND_MESSAGES'],
  execute: async(message: Message, ...args: any[]): Promise<EmbedOptions | undefined> => {
    if (!args[0]) {
      const cmdHandler = Luke.commandHandler
      let fields: any[] = []
      cmdHandler.plugins.forEach((plugin: Plugin) =>
        fields.push([plugin.data.name, `id: ${plugin.data.id}`])
      )
      return {
        title: `Help - All avaible plugins (${cmdHandler.plugins.length}).`,
        description: `${Luke.config.prefix}help [command|category]`,
        color: Luke.colors.info,
        fields: fields
      }
    } else {
      const command: Command = await Luke.commandHandler.get(args[0])
      if (command) 
        return {
          title: `${command.data.triggers[0]} (help).`,
          color: Luke.colors.info,
          fields: [
            ['Triggers', command.data.triggers, false],
            ['Description', command.data.description, false],
            ['Usage', `${Luke.config.prefix}${command.data.triggers[0]} ${command.data.usage}`, false],
            ['Developers command?', command.data.dev? 'yes': 'no', false],
            ['Bot permissions', command.data.botPermissions?.join(', ').toLowerCase() || 'none'],
            ['User permissions', command.data.userPermissions?.join(', ').toLowerCase().replace(/_/g, ' ') || 'none']
          ]
        }
      else {
        const plugin: Plugin = await Luke.pluginHandler.get(args[0])
        if (plugin) {
          let field: string[] = []
          plugin.data.commands.forEach((command: Command) =>
            field.push(command.data.triggers[0])
          )
          return {
            title: `${plugin.data.name} (help).`,
            description: field.join(', '),
            color: Luke.colors.info,
          }
        }
      }
    }   
  }
}