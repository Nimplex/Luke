import Luke, { Command, Field, Plugin } from './../../../index'

export const data: Command['data'] = {
  triggers: ['help'],
  description: 'Get all commands from category or view informations about single command.',
  usage: '[command|category]',
  botPermissions: ['SEND_MESSAGES'],
  execute: async(message, ...args) => {
    if (!args[0]) {
      const cmdHandler = Luke.commandHandler
      let fields: Field[] = []
      cmdHandler.plugins.forEach((plugin: Plugin) =>
        plugin.data?.hide ? '' : fields.push([plugin.data.name, `id: ${plugin.data.id}`, true])
      )
      return {
        title: `:grey_question: Help - All avaible plugins (${fields.length}).`,
        description: `${Luke.config.prefix}help [command|category]`,
        color: Luke.colors.info,
        fields: fields
      }
    } else {
      const command: Command = await Luke.commandHandler.get(args[0])
      if (command) 
        return {
          title: `:grey_question: ${command.data.triggers[0]} (help).`,
          color: Luke.colors.info,
          fields: [
            ['Triggers', command.data.triggers],
            ['Hide in help?', command.data?.hide ? 'yes' : 'no', true],
            ['Developers command?', command.data.dev? 'yes': 'no', true],
            ['Description', command.data.description],
            ['Usage', `${Luke.config.prefix}${command.data.triggers[0]} ${command.data.usage || ''}`],
            ['Bot permissions', command.data.botPermissions?.join(', ').toLowerCase().replace(/_/g, ' ') || 'none', true],
            ['User permissions', command.data.userPermissions?.join(', ').toLowerCase().replace(/_/g, ' ') || 'none', true]
          ]
        }
      else {
        const plugin = await Luke.pluginHandler.get(args[0])
        if (plugin) {
          let field: string[] = []
          plugin.data.commands.forEach((command: Command) => {
            if (command.data.hide) return
            else field.push(command.data.triggers[0])
          })
          return {
            title: `${plugin.data.name} (help).`,
            description: field.join(', ')
          }
        }
      }
    }   
  }
}