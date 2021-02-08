import { Plugin, Command } from '../types'
import PluginHandler from './PluginHandler'

export default class CommandHandler {
    plugins: Array<Plugin>
    constructor(PluginHandler: PluginHandler) {
        this.plugins = PluginHandler.plugins
    }

    get = (name: string): Command | undefined => {
        let temp
        this.plugins.forEach(plugin => {
            const command = plugin.commands.find(command => command.triggers.includes(name))
            if (command) temp = command
        })
        return temp
    }
}