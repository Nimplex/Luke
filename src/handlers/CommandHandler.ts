import { Luke } from '@/index'
import { Command } from '@/types'

export default class CommandHandler {
    private Luke: Luke

    constructor(Luke: Luke) {
        this.Luke = Luke
    }

    get(trigger: string): Command | undefined {
        let command = undefined
        this.Luke.PluginHandler.plugins.forEach(plugin => 
            command = plugin.commands.find(command => command.triggers.includes(trigger))
        )
        return command
    }
}