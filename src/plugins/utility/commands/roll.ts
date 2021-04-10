import { numberBetween } from '../../../modules/Utils'
import { Command } from '../../../types'

const command: Command = {
    triggers: ['roll'],
    description: 'Roll random number.',
    usage: [
        {
            name: 'number',
            type: 'number',
        },
        {
            name: 'number',
            type: 'number',
        },
    ],
    execute: async (message, Luke, ...args) => {
        if (
            !args[1] ||
            !args[0] ||
            typeof parseInt(args[0]) !== 'number' ||
            typeof parseInt(args[1]) !== 'number' ||
            isNaN(parseInt(args[0])) ||
            isNaN(parseInt(args[1]))
        )
            return false
        message.channel.send(
            numberBetween(parseInt(args[0]), parseInt(args[1]))
        )
    },
}

module.exports = command
