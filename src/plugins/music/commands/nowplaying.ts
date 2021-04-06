import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['np', 'nowplaying'],
    description: 'Check current track.',
    execute: async(message, Luke, ...args) => {
        if (!message.guild?.me?.voice.channel) {
            Luke.embed({
                object: message,
                color: colors.error,
                title: ':x: I\'m not in use!'
            })
            return
        }
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
        const cache = Luke.cache[(<any> message.guild?.id)]
        if (!cache) {
            Luke.embed({
                object: message,
                title: ':x: I cannot fetch cache (please disconnect bot and connect again)!',
                color: colors.error
            })
            return
        }
        const track = cache.getQueue()[0]
        Luke.embed({
            object: message,
            title: ':notes: Now playing',
            description: `Title: ${track.music.title}\nPosition: ${track.music.position}\nRequester: ${track.requester.username} (${track.requester.id})`,
            thumbnail: track.music.thumbnail
        })
    }
}

module.exports = command