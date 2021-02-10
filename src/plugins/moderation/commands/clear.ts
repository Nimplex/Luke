import { Command } from '../../../types'

const config = require('../../../../files/config.json')

const command: Command = {
    triggers: ['clear'],
    description: 'Clear the specified amount of messages.',
    usage: '<amount (< 100 | > 0)>',
    permissions: {
        bot: ['MANAGE_MESSAGES'],
        user: ['MANAGE_MESSAGES'],
    },
    execute: async(message, ...args) => {
        const amount = parseInt(args[0])

        if (!amount || isNaN(amount) || amount > 100 || amount < 0 || message.channel.type == "dm") return
        
        try {
            const messages = await message.channel.messages.fetch({ limit: amount })
            await message.channel?.bulkDelete(messages)
            return {
                title: `:broom: Deleted ${amount} message(s).`,
                color: config.colors.done
            }
        } catch (err) {
            return {
                title: `:x: Error.`,
                description: `Failed to delete ${amount} messages.`,
                color: config.colors.error
            }
        }
    }
}

module.exports = command