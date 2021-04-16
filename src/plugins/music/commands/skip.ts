import { Command } from '@/types'
import { MessageEmbed } from 'discord.js'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['skip', 's'],
    description: 'Skip track.',
    execute: async (message, Luke, ...args) => {
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
            cache.skip()
            cache.manager.setTextChannel(message.channel.id)
            message.channel.send(
                new MessageEmbed()
                    .setTitle(':fast_forward: | Skipped track!')
                    .setColor('#efefef')
                    .setTimestamp(new Date())
            )
        }
    },
}

module.exports = command
