import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['leave'],
    description: 'Leave voice channel.',
    permissions: {
        bot: ['CONNECT'],
    },
    execute: async(message, Luke, ...args) => {
        if (!message.member?.voice.channel) {
            Luke.embed({
                object: message,
                color: colors.error,
                description: 'You\'re not connected to my voice channel!'
            })
            return
        }
        if (!message.guild?.me?.voice.channel) {
            Luke.embed({
                object: message,
                color: colors.error,
                description: 'I\'m not in use!'
            })
            return
        }
        message.member.voice.channel?.leave()
        // @ts-expect-error
        Luke.cache[message.guild.id] = undefined
        Luke.embed({
            object: message,
            color: colors.done,
            description: 'Left voice channel.'
        })
    }
}

module.exports = command