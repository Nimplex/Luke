import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['clearqueue', 'cq'],
    description: 'Clear queue.',
    execute: async(message, Luke, ...args) => {
		if (!message.member?.voice.channel) {
            Luke.embed({
                object: message,
                color: colors.error,
                title: ':x: You\'re not connected to any voice channel!'
            })
            return
        }
        if (message.guild?.me?.voice.channelID !== message.member.voice.channelID) {
            Luke.embed({
                object: message,
                color: colors.error,
                title: ':x: You\'re not connected to my voice channel!'
            })
            return
        }
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
		cache.queue = []
        Luke.embed({
            object: message,
            title: `:1234: Cleared queue for: ${message.guild.name}`,
        })
    }
}

module.exports = command