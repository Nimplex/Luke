import { Luke } from '@/index'
import { message } from '@/types'
import ArgsHandler from '../ArgsHandler'

const { bot } = require('../../../files/config.json')

module.exports = async (Luke: Luke, message: message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.startsWith(bot.prefix)
    ) return

    const [commandName, ...args] = message.content.slice(bot.prefix.length).split(/ +/g)
    const command = Luke.CommandHandler.get(commandName)

    if (!command) return

    const testArgs = await ArgsHandler(args, command, message)

    if (
        command?.nsfw &&
        message.channel.nsfw
    ) return
    else if (!testArgs){
        try {
            const output = await command?.execute(message, Luke, args)
            if (output == false) {
                ArgsHandler(args, command, message, true)
            }
        } catch (error) {

        }
    }
}