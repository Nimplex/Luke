import { Luke } from '@/index'
import { Command, message } from '@/types'
import ArgsHandler from '../ArgsHandler'
import guildManager from '../../database/guildManager'

const colors = require('../../../files/colors.json')
const { bot } = require('../../../files/config.json')

export function error(name: string, message: message, Luke: Luke, command: Command) {
    switch(name) {
        case 'permissions_user':
            Luke.embed({
                object: message,
                description: `You're missing permissions:\n${command.permissions?.user}`,
                color: colors.error
            })
            break
        case 'permissions_bot':
            Luke.embed({
                object: message,
                description: `I'm missing permissions:\n${command.permissions?.bot}`,
                color: colors.error
            })
            break
    }
}

module.exports = async (Luke: Luke, message: message) => {
    if (message.author.bot || !message.guild) return

    Luke.LevelManager.increase(message.author.id, message.content.length / 15, message)
    const guild = await guildManager.get(message.guild.id)

    if (!message.content.startsWith(guild.prefix || bot.prefix)) return
    
    const [commandName, ...args] = message.content.slice(guild.prefix.length || bot.prefix).split(/ +/g)
    const command = Luke.CommandHandler.get(commandName)

    if (!command) return
    if (command.dev && !bot.developers.includes(message.author.id)) return
    if (!message.member?.permissions.has(command.permissions?.user || [])) return error('permissions_user', message, Luke, command)
    if (!message.guild.me?.permissions.has(command.permissions?.bot || [])) return error('permissions_bot', message, Luke, command)

    const testArgs = await ArgsHandler(args, command, message)

    if (
        command?.nsfw &&
        message.channel.nsfw
    ) return
    else if (!testArgs){
        try {
            const output = await command?.execute(message, Luke, ...args)
            if (output == false) {
                ArgsHandler(args, command, message, true)
            }
        } catch (error) {
            Luke.console.error(error)
        }
    }
}