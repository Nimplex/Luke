import { Embed } from '@/types'
import { MessageEmbed } from 'discord.js'

const colors = require('../../files/colors.json')

export default function (options: Embed): MessageEmbed {
    const embed = new MessageEmbed()

    options.title ? embed.setTitle(options.title) : false
    options.description
        ? embed.setDescription(
              options.disableDescriptionCodeBlock == true
                  ? options.description
                  : `\`\`\`${options.description}\`\`\``
          )
        : false
    options.author ? embed.setAuthor(options.author) : false
    options.color
        ? embed.setColor(options.color)
        : embed.setColor(colors.default)
    options.files ? embed.attachFiles(options.files) : false
    options.image ? embed.setImage(options.image) : false
    options.thumbnail ? embed.setThumbnail(options.thumbnail) : false
    options.timestamp
        ? embed.setTimestamp(options.timestamp)
        : embed.setTimestamp(new Date())
    options.url ? embed.setURL(options.url) : false
    options.footer
        ? embed.setFooter(options.footer)
        : options.object
        ? embed.setFooter(
              `Invoked by ${options.object?.author.tag} (${options.object?.author.id})`
          )
        : false

    options.fields?.forEach((field) => {
        const secondField =
            options.disableFieldsCodeBlock == true
                ? field[1]
                : `\`\`\`${field[1]}\`\`\``
        embed.addField(field[0], secondField, field[2] || false)
    })

    if (options.object) {
        options.object.channel.send(embed)
        return embed
    } else return embed
}
