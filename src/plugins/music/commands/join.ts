import { Player } from '../../../modules/MusicPlayer'
import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['join'],
    description: 'Join voice channel.',
    permissions: {
        bot: ['CONNECT'],
    },
    execute: async (message, Luke, ...args) => {
        if (!message.member?.voice.channel) {
            Luke.embed({
                object: message,
                color: colors.error,
                title: ":x: You're not connected to my voice channel!",
            })
            return
        }
        if (message.guild?.me?.voice.channel) {
            Luke.embed({
                object: message,
                color: colors.error,
                title: ":x: I'm already in use!",
            })
            return
        }
        const connection = await message.member.voice.channel?.join()
        Luke.cache[<any>message.guild?.id] = new Player(
            message.guild?.id || '',
            connection.channel.id,
            connection
        )
        Luke.embed({
            object: message,
            color: colors.done,
            title: ':wave: Joined voice channel',
        })
    },
}

module.exports = command
