import { Player } from '../../../modules/MusicPlayer'
import { Command } from '@/types'
import { validateURL } from 'ytdl-core'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['play', 'p'],
    description: 'Play music on voice channel.',
    permissions: {
        bot: ['CONNECT', 'SPEAK'],
    },
    usage: [
        {
            type: 'string',
            name: 'url',
            required: true
        }
    ],
    execute: async(message, Luke, ...args) => {
        if (!args[0]) return false
        if (!validateURL(args[0])) return false
        if (!message.member?.voice.channel) {
            Luke.embed({
                object: message,
                color: colors.error,
                title: ':x: You\'re not connected to any voice channel!'
            })
            return
        }
        if (!message.guild?.me?.voice.channel) {
            const connection = await message.member.voice.channel?.join()
            Luke.cache[(<any> message.guild?.id)] = new Player(message.guild?.id || '', connection.channel.id, connection)
            Luke.embed({
                object: message,
                color: colors.done,
                title: ':wave: Joined voice channel'
            })
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
        const track = await cache.addTrack(
            { id: message.author.id, username: message.author.username },
            { url: args[0] }
        )
        if (cache.getQueue().length == 1) cache.playTrack(message)
        else Luke.embed({
            object: message,
            title: 'Track added to queue!',
            description: `Title: ${track.music.title}\nPosition: ${track.music.position}`,
            thumbnail: track.music.thumbnail,
        })
    }
}

module.exports = command