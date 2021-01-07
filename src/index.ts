import { Client, ClientOptions } from 'discord.js'
import EventHandler from './handlers/events'
import Console from './handlers/console'

const { token } = require('../files/config.json')

export class Luke extends Client {
  eventHandler; console
  constructor(config: ClientOptions) {
    super(config)

    this.console = new Console()
    this.eventHandler = new EventHandler(this)
    this.login(token)
  }
}

export default new Luke({ partials: ['MESSAGE', 'CHANNEL'] })
