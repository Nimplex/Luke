import { Message } from 'discord.js'
import Luke from '../../'

const prefix = '.'

export default (message: Message): void => {
    if (!message.content.startsWith(prefix)
        || message.author.bot
        || !message.guild
    ) return
    
    const [commandName, ...args] = message.content.slice(prefix.length).split(/ +/g)
    const command = Luke.pluginHandler.cmds.get(commandName)
    if (command) command.execute(message)
}