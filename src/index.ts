import { Client, ClientOptions } from 'discord.js'
import CommandHandler from './handlers/CommandHandler'
import PluginHandler from './handlers/PluginHandler'
import EventHandler from './handlers/EventHandler'
import Console from './modules/Console'
import dashboard from './dashboard/server'

const tokens = require('../files/tokens.json')

export class Luke extends Client {
    dashboard: dashboard
    console = Console
    EventHandler: EventHandler
    CommandHandler: CommandHandler
    PluginHandler: PluginHandler

    constructor(options?: ClientOptions) {
        super(options)

        this.dashboard = new dashboard()
        this.PluginHandler = new PluginHandler(this)
        this.CommandHandler = new CommandHandler(this)
        this.EventHandler = new EventHandler(this)

        this.login(tokens.discord)
    }
}

export default new Luke({ partials: ['MESSAGE', 'USER', 'GUILD_MEMBER'] })