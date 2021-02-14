import { Luke } from '@/index'
import { Message } from 'discord.js'

module.exports = (Luke: Luke, message: Message) => {
    const command = Luke.CommandHandler.get('ping')
    console.log(command)
}