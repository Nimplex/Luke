import { MusicPlayer } from '../../../modules/MusicPlayer'
import { Command } from '@/types'
import { MessageEmbed, TextChannel } from 'discord.js'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['join'],
    description: 'Join voice channel.',
    permissions: {
        bot: ['CONNECT'],
    },
    execute: async (message, Luke, ...args) => {
        if (message.guild?.me?.voice.channel) {
            message.channel.send(
                new MessageEmbed()
                    .setTitle(":x: | I'm already in use!")
                    .setColor(colors.error)
                    .setTimestamp(new Date())
            )
            return
        }
        if (!message.member?.voice.channel) {
            message.channel.send(
                new MessageEmbed()
                    .setTitle(
                        ":x: | You're not connected to any voice channel!"
                    )
                    .setColor(colors.error)
                    .setTimestamp(new Date())
            )
            return
        }
        if (!Luke.musicCache.get(<string>message.guild?.id)) {
            const player = new MusicPlayer(
                <string>message.guild?.id,
                <string>message.member?.voice.channelID,
                <TextChannel>message.channel
            )

            Luke.musicCache.set(<string>message.guild?.id, player)
            player.connect()
        } else {
            Luke.musicCache.get(<string>message.guild?.id)?.connect()
        }
    },
}

module.exports = command
