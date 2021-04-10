import { Command } from '../../../types'

const command: Command = {
    triggers: ['rate'],
    description: 'Rates something.',
    usage: [
        {
            name: 'item',
            type: 'text',
            required: true,
        },
    ],
    execute: async (message, Luke, ...args) => {
        const thing = message.mentions.members?.first() || args.join(' ')
        const rate = Math.floor(Math.random() * 10)
        Luke.embed({
            object: message,
            description: `**${thing}**: ${':star:'.repeat(
                rate
            )}${':eight_pointed_black_star:'.repeat(10 - rate)}`,
            disableDescriptionCodeBlock: true,
        })
    },
}

module.exports = command
