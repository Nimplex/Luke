import { Command } from '@/types'
import { MessageEmbed } from 'discord.js'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['queue', 'q'],
    description: 'Display queue.',
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
            cache.manager.setTextChannel(message.channel.id)
            message.channel.send(
                new MessageEmbed()
                    .setTitle(`:notes: | Queue for ${message.guild?.name}`)
                    .setDescription(
                        `\`\`\`${cache.manager.queue
                            .map(
                                (track) =>
                                    `${
                                        cache.manager.queue.findIndex(
                                            (t) => t === track
                                        ) + 1
                                    }. ${track.title.substring(
                                        30,
                                        0
                                    )}...\n    - ${track.author}`
                            )
                            .join('\n')}\n\nLuke v3.3\`\`\``
                    )
                    .setColor('#efefef')
                    .setTimestamp(new Date())
            )
        }
    },
}

module.exports = command
