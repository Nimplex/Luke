import { Message } from 'discord.js'
import { Luke } from '../../'

const prefix = '.'
const config = require('../../../files/config.json')

export default (client: Luke, message: Message): void => {
    if (!message.content.startsWith(prefix)
        || message.author.bot
        || !message.guild
    ) return
    
    const [commandName, ...args] = message.content.slice(prefix.length).split(/ +/g)
    const command = client.pluginHandler.cmds.get(commandName)
    if (!command) return
    if (command.developer && !config.developers.include(message.author.id)) return
    if (command.permissions?.bot && !message.guild.me?.permissions.has(command.permissions.bot)) return
    if (command.permissions?.user && !message.guild.me?.permissions.has(command.permissions.user)) return
    command.execute(message, ...args)
}