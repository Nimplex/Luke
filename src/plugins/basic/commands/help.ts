import { Message } from 'discord.js'
import Luke, { Command, EmbedOptions, Plugin } from './../../../index'

const { prefix } = require('./../../../../files/config.json')

export const data = {
  triggers: ['help'],
  description: 'Get all commands from category or view informations about single command.',
  usage: '[command|category]',
  execute: async(message: Message, ...args: any[]): Promise<EmbedOptions | undefined> => {
    if (!args[0]) {
      const cmdHandler = Luke.commandHandler
      let fields: any[] = []
      cmdHandler.plugins.forEach((plugin: Plugin) => {
        fields.push([plugin.data.name, `${prefix}help ${plugin.data.id}`])
      })
      return {
        title: `Help - All avaible plugins (${cmdHandler.plugins.length}).`,
        fields: fields
      }
    } else {
      const command: Command = await Luke.commandHandler.get(args[0])
      if (command) 
        return {
          title: `${command.data.triggers[0]} (help)`,
          fields: [
            ['Triggers', command.data.triggers, false],
            ['Description', command.data.description, false],
            ['Usage', `${prefix}${command.data.triggers[0]} ${command.data.usage}`, false],
            ['Developers command?', command.data.dev? 'yes': 'no', false],
            ['Bot permissions', command.data.botPermissions || 'none'],
            ['User permissions', command.data.botPermissions || 'none']
          ]
        }
    }   
  }
}