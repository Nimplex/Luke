import { Client, ClientOptions, MessageEmbed, TextChannel } from 'discord.js'
import CommandHandler from './handlers/CommandHandler'
import PluginHandler from './handlers/PluginHandler'
import EventHandler from './handlers/EventHandler'
import LevelManager from './database/levelManager'
import Embed from './modules/Embed'
import Console from './modules/Console'
import dashboard from './dashboard/server'
import mongoose from 'mongoose'
import { Manager, Player } from 'erela.js'
// @ts-ignore
import serverline from 'serverline'
import { MusicPlayer } from './modules/MusicPlayer'

const tokens = require('../files/tokens.json')

mongoose
    .connect(`mongodb://${tokens.mongo.ip}/${tokens.mongo.database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authSource: tokens.mongo.authDatabase,
        user: tokens.mongo.username,
        pass: tokens.mongo.password,
        useCreateIndex: true,
    })
    .then(() => {
        Console.ready('MongoDB connected')
    })
    .catch((err) => {
        Console.error(`MongoDB error: ${err}`)
        process.exit()
    })

export class Luke extends Client {
    public dashboard!: dashboard
    public embed = Embed
    public console = Console
    public EventHandler: EventHandler
    public CommandHandler: CommandHandler
    public PluginHandler: PluginHandler
    public LevelManager: LevelManager
    public manager: Manager
    public musicCache: Map<string, MusicPlayer>

    constructor(options?: ClientOptions) {
        super(options)

        this.PluginHandler = new PluginHandler(this)
        this.CommandHandler = new CommandHandler(this)
        this.EventHandler = new EventHandler(this)
        this.LevelManager = new LevelManager(this)
        this.musicCache = new Map()

        const guildCache = this.guilds.cache
        this.manager = new Manager({
            nodes: [
                {
                    host: tokens.lavalink.host,
                    port: tokens.lavalink.port,
                    password: tokens.lavalink.password,
                },
            ],
            send(id, payload) {
                const guild = guildCache.get(id)
                if (guild) guild.shard.send(payload)
            },
        })
            .on('trackEnd', (player, track, load) => {
                const channel = this.channels.cache.get(
                    player.textChannel || '0'
                )
                if (!channel) return
                if (!player.trackRepeat) return
                if (load.reason === 'STOPPED') return
                else
                    (<TextChannel>channel).send(
                        new MessageEmbed()
                            .setTitle(':x: | Track ended!')
                            .setColor('#efefef')
                            .setTimestamp(new Date())
                    )
            })
            .on('queueEnd', (player, track, load) => {
                const channel = this.channels.cache.get(
                    player.textChannel || '0'
                )
                if (!channel) return
                else
                    (<TextChannel>channel).send(
                        new MessageEmbed()
                            .setTitle(':x: | Queue ended!')
                            .setColor('#efefef')
                            .setTimestamp(new Date())
                    )
            })
            .on('nodeConnect', (node) =>
                this.console.log(`Node ${node.options.identifier} connected`)
            )
            .on('nodeError', (node, error) =>
                this.console.error(
                    `Node ${node.options.identifier} had an error: ${error.message}`
                )
            )

        this.login(tokens.discord)

        serverline.init({ colorMode: true, prompt: '> ' })
        serverline.on('line', async (line: string) => {
            try {
                const result = await eval(line)
                console.log(result)
            } catch (err) {
                this.console.error(err)
            }
        })
    }
}

export default new Luke()
