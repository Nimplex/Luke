import { config as dotenv } from 'dotenv'
import { Client, ClientOptions } from 'discord.js'
import { join } from 'path'
import Console from './handlers/Console'
import EventHandler from './handlers/EventHandler'
import PluginHandler from './handlers/PluginHandler'

dotenv({ path: join(__dirname, '..', '.env')})

export class Luke extends Client {
    console: Console
    eventHandler: EventHandler
    pluginHandler: PluginHandler

    constructor(options?: ClientOptions) {
        super(options)

        this.console = new Console()
        this.eventHandler = new EventHandler(this)
        this.pluginHandler = new PluginHandler(this)

        this.login(process.env.token)
    }
}

export default new Luke()