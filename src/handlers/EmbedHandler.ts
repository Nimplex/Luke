import { Message, MessageEmbed } from 'discord.js'
import { Embed } from '../types'

const config = require('../../files/config.json')

export default function(Embed: Embed, message: Message): MessageEmbed {
    const embed = new MessageEmbed()
    if (Embed.title) embed.setTitle(Embed.title)
    if (Embed.description) embed.setDescription(`\`\`\`${Embed.description}\`\`\``)
    if (Embed.footer) embed.setFooter(Embed.footer)
    else embed.setFooter(`Invoked by ${message.author.tag} (${message.author.id})`)
    if (Embed.image) embed.setImage(Embed.image)
    if (Embed.thumbnail) embed.setThumbnail(Embed.thumbnail)
    if (Embed.timestamp) embed.setTimestamp(Embed.timestamp)
    else embed.setTimestamp(new Date())
    if (Embed.author) embed.setAuthor(Embed.author?.text, Embed.author?.icon)
    if (Embed.url) embed.setURL(Embed.url)
    embed.setColor(Embed.color || config.colors.default)
    Embed.fields?.forEach(field => {
        embed.addField(field[0] || 'Null', `\`\`\`${field[1] || 'none'}\`\`\``, field[2] || false)
    })
    return embed
}