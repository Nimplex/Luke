import { Client, ClientOptions } from 'discord.js'
import CommandHandler from './handlers/CommandHandler'
import PluginHandler from './handlers/PluginHandler'
import EventHandler from './handlers/EventHandler'
import Embed from './modules/Embed'
import Console from './modules/Console'
import dashboard from './dashboard/server'
import mongoose from 'mongoose'

const tokens = require('../files/tokens.json')

mongoose.connect(
    `mongodb://${tokens.mongo.ip}/${tokens.mongo.database}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: tokens.mongo.authDatabase,
        user: tokens.mongo.username,
        pass: tokens.mongo.password
    }
).then(() => {
    Console.ready('MongoDB connected')
}).catch(err => {
    Console.error(`MongoDB error: ${err}`)
    process.exit()
})

export class Luke extends Client {
    dashboard!: dashboard
    embed = Embed
    console = Console
    EventHandler: EventHandler
    CommandHandler: CommandHandler
    PluginHandler: PluginHandler

    constructor(options?: ClientOptions) {
        super(options)

        this.PluginHandler = new PluginHandler(this)
        this.CommandHandler = new CommandHandler(this)
        this.EventHandler = new EventHandler(this)

        this.login(tokens.discord)
    }
}

export default new Luke({ partials: ['MESSAGE', 'USER', 'GUILD_MEMBER'] })