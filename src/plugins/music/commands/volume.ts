import { Command } from '@/types'
import { MessageEmbed } from 'discord.js'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['volume'],
    description: 'Change volume of player.',
    usage: [
        {
            type: 'number',
            name: 'volume',
            required: true,
        },
    ],
    execute: async (message, Luke, ...args): Promise<any> => {
        if (!message.guild?.me?.voice.channel) {
            message.channel.send(
                new MessageEmbed()
                    .setTitle(":x: | I'm not in use!")
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
        if (
            message.member.voice.channelID !== message.guild.me.voice.channelID
        ) {
            message.channel.send(
                new MessageEmbed()
                    .setTitle(":x: | You're not connected to my voice channel!")
                    .setColor(colors.error)
                    .setTimestamp(new Date())
            )
            return
        }
        const cache = Luke.musicCache.get(<string>message.guild?.id)
        if (cache) {
            if (
                parseInt(args[0]) !== NaN &&
                (parseInt(args[0]) > 150 || parseInt(args[0]) < 0)
            )
                return message.channel.send(
                    new MessageEmbed()
                        .setTitle(`:x: | Volume should be between 0 and 150`)
                        .setColor('#efefef')
                        .setTimestamp(new Date())
                )
            cache.setVolume(parseInt(args[0]) || 100)
            cache.manager.setTextChannel(message.channel.id)
            message.channel.send(
                new MessageEmbed()
                    .setTitle(
                        `:loudspeaker: | Volume changed to ${cache.manager.volume}`
                    )
                    .setColor('#efefef')
                    .setTimestamp(new Date())
            )
        }
    },
}

module.exports = command
