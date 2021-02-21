import { Command } from '@/types'

const colors = require('../../../../files/colors.json')

const command: Command = {
    triggers: ['settopic'],
    description: 'Changes channel topic.',
    permissions: {
        bot: ['MANAGE_CHANNELS'],
        user: ['MANAGE_CHANNELS'],
    },
    usage: [
        {
            name: 'topic',
            type: 'text',
        }
    ],
    execute: async(message, Luke, ...args) => {
        let channel = message.mentions.channels.first() || message.channel
        let topic = args.join(' ') || ''

        await channel.setTopic(topic)

        Luke.embed({
            object: message,
            description: `Channel topic changed to:\n**${topic || 'none'}**`,
        })
    }
}

module.exports = command