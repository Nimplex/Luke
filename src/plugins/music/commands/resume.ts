import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['resume'],
    description: 'Resume current track.',
    execute: async (message, Luke, ...args) => {
        if (!message.member?.voice.channel) {
            Luke.embed({
                object: message,
                color: colors.error,
                title: ":x: You're not connected to any voice channel!",
            })
            return
        }
        if (
            !message.member?.voice.channel ||
            message.member.voice.channelID !==
                message.guild?.me?.voice.channelID
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
        cache.resumePlayer()
        Luke.embed({
            object: message,
            title: ':play_pause: Resumed player',
        })
    },
}

module.exports = command
