import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['pause'],
    description: 'Pause current track.',
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
        cache.pausePlayer()
        Luke.embed({
            object: message,
            title: ':pause_button: Paused player',
        })
    },
}

module.exports = command
