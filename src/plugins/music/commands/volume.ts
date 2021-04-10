import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['volume'],
    description: 'Change volume of player.',
    usage: [
        {
            type: 'number',
            name: 'volume',
            required: true,
        },
    ],
    execute: async (message, Luke, ...args) => {
        if (!args[0] || typeof parseInt(args[0]) !== 'number') return false
        if (!message.member?.voice.channel) {
            Luke.embed({
                object: message,
                color: colors.error,
                title: ":x: You're not connected to my voice channel!",
            })
            return
        }
        if (
            message.guild?.me?.voice.channelID !==
            message.member.voice.channelID
        ) {
            Luke.embed({
                object: message,
                color: colors.error,
                title: ":x: You're not connected to my voice channel!",
            })
            return
        }
        const cache = Luke.cache[<any>message.guild?.id]
        if (!cache) {
            Luke.embed({
                object: message,
                title:
                    ':x: I cannot fetch cache (please disconnect bot and connect again)!',
                color: colors.error,
            })
            return
        }
        const volume = cache.setVolume(parseInt(args[0]))
        Luke.embed({
            object: message,
            title: `:loudspeaker: Changed volume to: ${volume}`,
        })
    },
}

module.exports = command
