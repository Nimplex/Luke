import { Luke } from '@/index'
import { Command } from '@/types'

export default class CommandHandler {
    private Luke: Luke

    constructor(Luke: Luke) {
        this.Luke = Luke
    }

    get(trigger: string): Command | undefined {
        let command: Command | undefined
        this.Luke.PluginHandler.plugins.forEach((plugin) => {
            const cmd = plugin.commands.find((command) =>
                command.triggers.includes(trigger)
            )
            if (cmd) return (command = cmd)
        })
        return command
    }
}
