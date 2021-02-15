import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['clear'],
    description: 'Clear the specified amount of messages.',
    permissions: {
        bot: ['MANAGE_MESSAGES'],
        user: ['MANAGE_MESSAGES'],
    },
    usage: [
        {
            type: 'number',
            name: 'amount, (> 100 | < 0)'
        }
    ],
    execute: async(message, Luke, ...args) => {
        const amount = parseInt(args[0])

        if (amount > 100 || amount < 0) return false
        
        try {
            const messages = await message.channel.messages.fetch({ limit: amount })
            await message.channel?.bulkDelete(messages)
            Luke.embed({
                object: message,
                description: `:broom: Deleted ${amount} message(s).`,
                color: colors.done
            })
        } catch (err) {
            Luke.embed({
                object: message,
                description: `Failed to delete ${amount} messages.`,
                color: colors.error
            })
        }
    }
}

module.exports = command