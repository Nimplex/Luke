import dashboard from './dashboard/server'
import { ShardingManager } from 'discord.js'
import { join } from 'path'
import Console from './modules/Console'

const tokens = require('../files/tokens.json')

const manager = new ShardingManager(join(__dirname, 'client.js'), {
    totalShards: 'auto',
    shardList: 'auto',
    mode: 'process',
    shardArgs: process.argv[2] ? ['dev'] : [],
    token: tokens.discord,
})
manager.on('shardCreate', (shard) => {
    shard.on('ready', async () =>
        Console.ready(
            `Shard ${shard.id} ${await shard.fetchClientValue(
                'user.tag'
            )} is ready!`
        )
    )
    shard.on('death', () => Console.error(`Shard ${shard.id} has died.`))
    shard.on('error', (err) =>
        Console.error(`Shard ${shard.id} has errored: ${err}.`)
    )
})

const dash = new dashboard()
const bootstrap = async () => await manager.spawn()
bootstrap()

export default manager
