import { Command } from '@/types'

const command: Command = {
    triggers: ['dashboard', 'dash'],
    description: 'dashboard',
    execute: async (message, Luke, ...args) => {
        Luke.embed({
            object: message,
            description: `https://lukebot.xyz/dashboard/${message.guild?.id}/basic`,
        })
    },
}

module.exports = command
