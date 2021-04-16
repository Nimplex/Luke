import { MessageEmbed } from 'discord.js'
import { Command } from '@/types'

const command: Command = {
    triggers: ['np', 'nowplaying'],
    description: 'Check current track.',
    execute: async (message, Luke, ...args) => {
        const cache = Luke.musicCache.get(<string>message.guild?.id)
        if (cache) {
            const track = cache.nowplaying()
            if (!track) return
            cache.manager.setTextChannel(message.channel.id)
            message.channel.send(
                new MessageEmbed()
                    .setTitle(':notes: | Now playing')
                    .setThumbnail(<string>track?.thumbnail)
                    .setDescription(
                        `\`\`\`Title: ${track.title}\nAuthor: ${track.author}\`\`\``
                    )
                    .setColor('#efefef')
                    .setTimestamp(new Date())
            )
        }
    },
}

module.exports = command
