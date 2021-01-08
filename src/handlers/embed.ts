import { Message, MessageEmbed } from 'discord.js'
import { EmbedOptions } from './../index'

export default function(Embed: EmbedOptions, message: Message) {
  const embed = new MessageEmbed()
  if (Embed.title) embed.setTitle(Embed.title)
  if (Embed.description) embed.setDescription(`\`\`\`${Embed.description}\`\`\``)
  if (Embed.color) embed.setColor(Embed.color)
  if (Embed.footer) embed.setFooter(Embed.footer)
  if (Embed.image) embed.setImage(Embed.image)
  if (Embed.thumbnail) embed.setThumbnail(Embed.thumbnail)
  if (Embed.timestamp) embed.setTimestamp(Embed.timestamp)
  if (Embed.author) embed.setAuthor(Embed.author?.text, Embed.author?.icon)
  if (Embed.url) embed.setURL(Embed.url)
  Embed.fields?.forEach(field => {
    embed.addField(field[0] || '', field[1] || '', field[2] || false)
  })
  message.channel.send(embed)
}