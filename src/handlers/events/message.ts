import { Message } from 'discord.js'
import EmbedHandler from '../../handlers/EmbedHandler'
import { Luke } from '../../'

const prefix = '.'
const config = require('../../../files/config.json')

export default async(client: Luke, message: Message): Promise<void> => {
    if (!message.content.startsWith(prefix)
        || message.author.bot
        || !message.guild
    ) return
    
    const [commandName, ...args] = message.content.slice(prefix.length).split(/ +/g)
    const command = client.pluginHandler.cmds.get(commandName)
    if (!command) return
    if (command.developer && !config.developers.include(message.author.id)) return
    if (command.permissions?.bot && !message.guild.me?.permissions.has(command.permissions.bot)) return
    if (command.permissions?.user && !message.member?.permissions.has(command.permissions.user)) return
    const output = await command.execute(message, ...args)
    if (output) {
        const embed = EmbedHandler(output, message)
        message.channel.send(embed)
    }
}