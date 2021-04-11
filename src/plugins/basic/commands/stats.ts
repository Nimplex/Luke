import { Command } from '@/types'

const command: Command = {
    triggers: ['stats'],
    description: 'Shows bot stats.',
    execute: async (message, Luke, ...args) => {
        const memberCount = await Luke.shard?.broadcastEval(
            'this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'
        )
        const channelCount = await Luke.shard?.fetchClientValues(
            'channels.cache.size'
        )
        const guildCount = await Luke.shard?.fetchClientValues(
            'guilds.cache.size'
        )
        Luke.embed({
            object: message,
            description: `
                <:online:830477901698170952> Total guilds: **${guildCount?.reduce(
                    (a, b) => a + b,
                    0
                )}**
                <:online:830477901698170952> Total members: **${memberCount?.reduce(
                    (a, b) => a + b,
                    0
                )}**
                <:online:830477901698170952> Total cached channels: **${channelCount?.reduce(
                    (a, b) => a + b,
                    0
                )}**
                <:BrugOkBro:830778463233114123> Total shards: **${
                    Luke.shard?.count
                }**
            `,
            disableDescriptionCodeBlock: true,
        })
    },
}

module.exports = command
