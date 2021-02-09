import Luke from '../../../index'
import { Command, Field, Plugin } from '../../../types'

const config = require('../../../../files/config.json')

const command: Command = {
    triggers: ['help'],
    description: 'Get all commands from category or view informations about single command.',
    usage: '[command|category]',
    execute: async(message, ...args) => {
        const cmdHandler = Luke.pluginHandler.cmds
        if (!args[0]) {
            let fields: Field[] = []
            cmdHandler.plugins.forEach((plugin: Plugin) =>
                plugin?.hide ? '' : fields.push([plugin.name, `id: ${plugin.id}`, true])
            )
            return {
                title: `:grey_question: Help - All avaible plugins (${fields.length}).`,
                description: `${config.prefix}help [command|category]`,
                color: config.colors.info,
                fields: fields
            }
        } else {
            const command = await cmdHandler.get(args[0])
            if (command) 
            return {
                title: `:grey_question: ${command.triggers[0]} (help).`,
                color: config.colors.info,
                fields: [
                    ['Triggers', command.triggers],
                    ['Hide in help?', command?.hide ? 'yes' : 'no', true],
                    ['Developers command?', command?.developer ? 'yes': 'no', true],
                    ['Description', command.description],
                    ['Usage', `${config.prefix}${command.triggers[0]} ${command.usage || ''}`],
                    ['Bot permissions', command.permissions?.bot?.toString().toLowerCase().replace(/_/g, ' ') || 'none', true],
                    ['User permissions', command.permissions?.user?.toString().toLowerCase().replace(/_/g, ' ') || 'none', true]
                ]
            }
            else {
                const plugin = await Luke.pluginHandler.get(args[0])
                if (plugin) {
                    let field: string[] = []
                    plugin.commands.forEach((command: Command) => {
                        if (command.hide) return
                        else field.push(command.triggers[0])
                    })
                    return {
                        title: `${plugin.name} (help).`,
                        description: field.join(', ')
                    }
                }
            }
        }
    }
}

module.exports = command