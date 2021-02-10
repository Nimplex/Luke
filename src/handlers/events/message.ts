import { Luke } from '../../'
import { message } from '../../types'
import EmbedHandler from '../../handlers/EmbedHandler'

const config = require('../../../files/config.json')

export default async(client: Luke, message: message): Promise<void> => {
    if (!message.content.startsWith(config.prefix)
        || message.author.bot
        || !message.guild
    ) return
    
    const [commandName, ...args] = message.content.slice(config.prefix.length).split(/ +/g)
    const command = client.pluginHandler.cmds.get(commandName)
    if (!command) return
    if (command.developer && !config.developers.include(message.author.id)) return
    if (command.permissions?.bot && !message.guild.me?.permissions.has(command.permissions.bot)) {
        const missing: string[] = []
        
        command.permissions.bot.toString().split(',').forEach((permission: any) => {
            if(!message.guild?.me?.permissions.has(permission)) missing.push(permission.toLowerCase().replace(/_/gm, ' '))
        })

        const Embed = {
            title: ':x: Error',
            description: `I'm missing these permissions:\n${missing.join(', ')}`,
            color: config.colors.error
        }

        message.channel.send(EmbedHandler(Embed, message))
        return
    }
    if (command.permissions?.user && !message.member?.permissions.has(command.permissions.user)) {
        const missing: string[] = []
        
        command.permissions.user?.toString().split(',').forEach((permission: any) => {
            if(!message.member?.permissions.has(permission)) missing.push(permission.toLowerCase().replace(/_/gm, ' '))
        })

        const Embed = {
            title: ':x: Error',
            description: `You're missing these permissions:\n${missing.join(', ')}`,
            color: config.colors.error
        }

        message.channel.send(EmbedHandler(Embed, message))
        return
    }
    const output = await command.execute(message, ...args)
    if (output) {
        const embed = EmbedHandler(output, message)
        message.channel.send(embed)
    } else {
        const Embed = {
            title: ':x: Error',
            description: `Invalid arguments. Usage:\n${command.usage || 'none'}`,
            color: config.colors.error
        }

        message.channel.send(EmbedHandler(Embed, message))
        return
    }
}