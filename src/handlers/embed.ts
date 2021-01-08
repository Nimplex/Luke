import { Message, MessageEmbed } from 'discord.js'
import { EmbedOptions, Luke } from './../index'

export default function(Embed: EmbedOptions, message: Message, Luke: Luke) {
  const embed = new MessageEmbed()
  if (Embed.title) embed.setTitle(Embed.title)
  if (Embed.description) embed.setDescription(`\`\`\`${Embed.description}\`\`\``)
  if (Embed.footer) embed.setFooter(Embed.footer)
  if (Embed.image) embed.setImage(Embed.image)
  if (Embed.thumbnail) embed.setThumbnail(Embed.thumbnail)
  if (Embed.timestamp) embed.setTimestamp(Embed.timestamp)
  if (Embed.author) embed.setAuthor(Embed.author?.text, Embed.author?.icon)
  if (Embed.url) embed.setURL(Embed.url)
  embed.setColor(Embed.color || Luke.colors.default)
  Embed.fields?.forEach(field => {
    embed.addField(field[0] || 'Null', `\`\`\`${field[1] || 'null'}\`\`\``, field[2] || true)
  })
  console.log(Embed)
  message.channel.send(embed)
}