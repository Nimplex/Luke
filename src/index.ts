import { Client, ClientOptions, Message } from 'discord.js'
import EventHandler from './handlers/events'
import PluginHandler from './handlers/plugins'
import CommandHandler from './handlers/commands'
import Console from './handlers/console'

const { token } = require('../files/config.json')

export interface Plugin {
  data: {
    name: String,
    id: String,
    commands: any[]
  }
}

export interface Command {
  data: {
    triggers: String[],
    description: String,
    usage: String,
    dev: boolean,
    execute: Function
  }
}

export interface CommandOutput {
  message: Message,
  args?: string[]
}

export class Luke extends Client {
  eventHandler; pluginHandler; commandHandler; console; plugins: any;
  constructor(config: ClientOptions) {
    super(config)

    this.console = new Console()
    this.eventHandler = new EventHandler(this)
    this.pluginHandler = new PluginHandler(this)
    this.commandHandler = new CommandHandler(this)

    this.login(token)
  }
}

export default new Luke({ partials: ['MESSAGE', 'CHANNEL'] })