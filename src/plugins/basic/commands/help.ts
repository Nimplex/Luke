import { Command, Field } from '@/types'

const { bot } = require('../../../../files/config.json')

const command: Command = {
    triggers: ['help'],
    description: 'Shows informations about single command or whole category.',
    usage: [
        {
            type: 'string',
            name: 'category | command'
        }
    ],
    execute: async(message, Luke, ...args) => {
        if (!args[0]) {
            const fields: Field[] = []
            
            Luke.PluginHandler.plugins.forEach(plugin => {
                plugin.hide == true ? false : fields.push([plugin.name, `ID: ${plugin.id}`])
            })
            
            Luke.embed({
                object: message,
                fields: fields
            })
        } else {
            const plugin = Luke.PluginHandler.plugins.find(plugin => plugin.id == args[0])
            const command = Luke.CommandHandler.get(args[0])

            if (!plugin && !command) return false
            else {
                if (plugin) {
                    const commands: string[] = []

                    plugin.commands.forEach(command => {
                        command.hide == true ? false : commands.push(command.triggers[0])
                    })
                    
                    Luke.embed({
                        object: message,
                        description: commands.join('\n')
                    })
                } else if (command) {
                    let usage = `${bot.prefix}${command.triggers[0]} `

                    command.usage?.forEach(us => {
                        usage += `${us.required ? `<${us.type}>` : `[${us.type}]`} `
                    })
                    
                    Luke.embed({
                        object: message,
                        fields: [
                            ['Triggers', command?.triggers.join(',')],
                            ['Description', command?.description || 'none'],
                            ['Hide in help?', command?.hide == true ? 'yes' : 'no', true],
                            ['NSFW command?', command?.nsfw == true ? 'yes' : 'no', true],
                            ['Developer only?', command?.dev == true ? 'yes' : 'no', true],
                            ['Usage', usage || 'none'],
                            ['Bot permissions', command.permissions?.bot?.toString().toLowerCase().replace(/_/g, ' ') || 'none', true],
                            ['User permissions', command.permissions?.user?.toString().toLowerCase().replace(/_/g, ' ') || 'none', true]
                        ]
                    })
                }
            }
        }
    }
}

module.exports = command