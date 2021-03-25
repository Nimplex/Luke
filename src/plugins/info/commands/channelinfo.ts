import { Command } from '../../../types'

const command: Command = {
    triggers: ['channel', 'channelinfo'],
    description: 'Shows informations about channel.',
    permissions: {
        bot: ['MANAGE_CHANNELS']
    },
    usage: [
        {
            name: '#channel',
            type: 'channel'
        }
    ],
    execute: async(message, Luke, ...args) => {
        const channel = message.mentions.channels.first() || message.channel
        const firstMessage = (await channel.messages.fetch({ limit: 1, after: '1' })).first()

        Luke.embed({
            object: message,
            fields: [
                ['Name', channel.name, true],
                ['ID', channel.id, true],
                ['Topic', channel.topic || 'none'],
                ['Deleted?', channel.deleted == true ? 'yes' : 'no', true],
                ['NSFW?', channel.nsfw == true ? 'yes' : 'no', true],
                ['Viewable', channel.viewable == true ? 'yes' : 'no', true],
                ['Type', channel.type, true],
                ['Position', channel.position, true],
                ['First message', `Content: ${firstMessage?.content}\nAuthor: ${firstMessage?.author.tag} (${firstMessage?.author.id})`]
            ]
        })
    }
}

module.exports = command