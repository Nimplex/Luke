import Embed from '../../../modules/Embed'
import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['remove'],
    description: 'Remove track from queue.',
    execute: async(message, Luke, ...args) => {
        if (!args[0] || typeof parseInt(args[0]) !== 'number') return false
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
        const track = cache.getTrack(parseInt(args[0]))
        if (!track) return
        cache.removeTrack(parseInt(args[0]))
        Embed({
            object: message,
            title: `:sparkles: Removed ${track.music.title} from queue.`,
            thumbnail: track.music.thumbnail
        })
    }
}

module.exports = command