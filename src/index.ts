import { Client, ClientOptions, ColorResolvable, FileOptions, MessageAttachment, StringResolvable } from 'discord.js'
import EventHandler from './handlers/events'
import PluginHandler from './handlers/plugins'
import CommandHandler from './handlers/commands'
import Console from './handlers/console'

const { token } = require('../files/config.json')

export interface Plugin {
  data: {
    name: string,
    id: string,
    commands: any[]
  }
}

export interface Command {
  data: {
    triggers: string[],
    description: string,
    usage: string,
    dev?: boolean,
    userPermissions?: string[],
    botPermissions?: string[],
    execute: (...args: any) => Promise<EmbedOptions | undefined>
  }
}

export interface EmbedOptions {
  fields?: any[],
  files?: Array<string | FileOptions | MessageAttachment>,
  author?: { text: StringResolvable, icon: string },
  color?: ColorResolvable,
  description?: StringResolvable,
  footer?: StringResolvable
  image?: string,
  thumbnail?: string,
  timestamp?: Date | number,
  title?: StringResolvable,
  url?: string
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
  get colors() {
    return {
      default: '#fcba03',
      error: '#eb4034',
      done: '#32a852',
      info: '#4287f5'
    }
  }
}

export default new Luke({ partials: ['MESSAGE', 'CHANNEL'] })