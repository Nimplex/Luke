import { Embed, message } from '@/types'
import { MessageAttachment, MessageEmbed } from 'discord.js'
import imageType from 'image-type'

const colors = require('../../files/colors.json')

export default function (options: Embed): Promise<message> | MessageEmbed {
    const embed = new MessageEmbed()

    if (options.attachment && options.attachment.length > 0) {
        const type = imageType(options.attachment)
        const file = new MessageAttachment(
            options.attachment,
            `x.${type ? type.ext : 'png'}`
        )
        embed.attachFiles([file])
        embed.setImage(`attachment://x.${type ? type.ext : 'png'}`)
    }
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
        const msg = options.object.channel.send(embed)
        return <any>msg
    } else return embed
}
