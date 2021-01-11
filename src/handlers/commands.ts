import { Luke, Command, Plugin } from '../index'

export default class CommandHandler {
  plugins;
  constructor({ plugins }: Luke) {
    this.plugins = plugins
  }
  async get(cmdName: string): Promise<any> {
    let temp
    this.plugins.forEach(async(plugin: Plugin) => {
      const command = plugin.data.commands.find((command: Command) => command.data.triggers.includes(cmdName))
      if (command) temp = command
    })
    return temp
  }
  async findPlugin(cmdName: string): Promise<any> {
    let temp
    this.plugins.forEach(async(plugin: Plugin) => {
      const command = plugin.data.commands.find((command: Command) => command.data.triggers.includes(cmdName))
      if (command) temp = plugin
    })
    return temp
  }
}