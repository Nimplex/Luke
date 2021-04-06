import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['leave'],
    description: 'Leave voice channel.',
    permissions: {
        bot: ['CONNECT'],
    },
    execute: async(message, Luke, ...args) => {
        if (!message.member?.voice.channel || message.member.voice.channelID !== message.guild?.me?.voice.channelID) {
            Luke.embed({
                object: message,
                color: colors.error,
                title: ':x: You\'re not connected to my voice channel!'
            })
            return
        }
        message.member.voice.channel?.leave()
        // @ts-expect-error
        Luke.cache[message.guild.id] = undefined
        Luke.embed({
            object: message,
            color: colors.done,
            title: ':door: Left voice channel'
        })
    }
}

module.exports = command