import { MessageEmbed, TextChannel } from 'discord.js'
import { Command, message } from '@/types'
import { MusicPlayer } from '../../../modules/MusicPlayer'

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
            required: true,
        },
    ],
    execute: async (message, Luke, ...args) => {
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
            message.member.voice.channelID !==
                message.guild?.me?.voice.channelID &&
            message.guild?.me?.voice.channel
        ) {
            message.channel.send(
                new MessageEmbed()
                    .setTitle(":x: | You're not connected to my voice channel!")
                    .setColor(colors.error)
                    .setTimestamp(new Date())
            )
            return
        }
        if (!message.guild?.me?.voice.channel) {
            if (!Luke.musicCache.get(<string>message.guild?.id)) {
                const player = new MusicPlayer(
                    <string>message.guild?.id,
                    <string>message.member?.voice.channelID,
                    <TextChannel>message.channel
                )
                player.manager.setVoiceChannel(
                    <string>message.member?.voice.channelID
                )
                Luke.musicCache.set(<string>message.guild?.id, player)
                player.connect()
            } else {
                Luke.musicCache.get(<string>message.guild?.id)?.connect()
            }
        }
        const player = Luke.musicCache.get(<string>message.guild?.id)
        const track = (
            (await player?.search(args.join(' '), message.author)) || {
                tracks: [],
            }
        ).tracks[0]
        player?.addToQueue(track)
        if (!(<any>player)?.manager?.playing) player?.play()
        else
            message.channel.send(
                new MessageEmbed()
                    .setTitle(':notes: | Added to queue')
                    .setThumbnail(<string>track?.thumbnail)
                    .setDescription(
                        `\`\`\`Title: ${track.title}\nAuthor: ${track.author}\`\`\``
                    )
                    .setColor('#efefef')
                    .setTimestamp(new Date())
            )
    },
}

module.exports = command
