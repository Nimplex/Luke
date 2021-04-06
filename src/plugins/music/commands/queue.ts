import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['queue'],
    description: 'Display queue.',
    execute: async(message, Luke, ...args) => {
        if (!message.guild?.me?.voice.channel) {
            Luke.embed({
                object: message,
                color: colors.error,
                title: ':x: I\'m not in use!'
            })
            return
        }
        const cache = Luke.cache[(<any> message.guild?.id)]
        if (!cache) {
            Luke.embed({
                object: message,
                title: ':x: I cannot fetch cache (please disconnect bot and connect again)!',
                color: colors.error
            })
            return
        }
        Luke.embed({
            object: message,
            title: `:1234: Queue for: ${message.guild.name}`,
            thumbnail: message.guild.iconURL({ dynamic: true }),
            description: cache.getQueue().map(track => `${track.music.position}. ${track.music.title} (${track.requester.username})`).join('\n')
        })
    }
}

module.exports = command