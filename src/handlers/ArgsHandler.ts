import { arg, Command, message } from '@/types'
import Luke from '..'

const { bot } = require('../../files/config.json')
const colors = require('../../files/colors.json')

export default async function (args: any[], command: Command, message: message) {
    return new Promise(async (resolve, reject) => {
        if (!command.usage) return resolve(false)
    
        if (command.usage.length > 0 && args.length < command.usage.length) {
            let usage = `${bot.prefix}${command.triggers[0]} `

            command.usage.forEach(us => {
                usage += `${us.required ? `<${us.type}>` : `[${us.type}]`} `
            })

            return error(message, `Correct Usage:\n${usage}`)
        }

        for (let i = 0; i < command.usage.length; i++) {
            if (command.usage[i].type == 'mention' && !message.mentions.members?.first())
                return error(message, `Wrong ${command.usage[i].required ? `<${command.usage[i].name}>` : `[${command.usage[i].name}]`} argument\n\nIt needs to be ${command.usage[i].required ? `<${command.usage[i].type}>` : `[${command.usage[i].type}]`}.`)
            if (command.usage[i].type == 'number' && isNaN(args[i]))
                return error(message, `Wrong ${command.usage[i].required ? `<${command.usage[i].name}>` : `[${command.usage[i].name}]`} argument\n\nIt needs to be ${command.usage[i].required ? `<${command.usage[i].type}>` : `[${command.usage[i].type}]`}.`)
            console.log(isNaN(args[i]))
        }
        
        resolve(false)

        function error(message: message, text: string) {
            Luke.embed({
                object: message,
                description: text,
                color: colors.error
            })
            resolve(true)
        }
    })
}