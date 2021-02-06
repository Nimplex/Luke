import { config as dotenv } from 'dotenv'
import { Client, ClientOptions } from 'discord.js'
import EventHandler from './handlers/EventHandler'
import PluginHandler from './handlers/PluginHandler'

dotenv()

export class Luke extends Client {
    eventHandler: EventHandler
    pluginHandler: PluginHandler

    constructor(options?: ClientOptions) {
        super(options)

        this.eventHandler = new EventHandler(this)
        this.pluginHandler = new PluginHandler(this)

        this.login(process.env.token)
    }
}

export default new Luke()