import { Command } from '../../../types'

const command: Command = {
    triggers: ['firstmessage', 'first'],
    description: 'Shows first message in channel.',
    permissions: {
        bot: ['READ_MESSAGE_HISTORY'],
    },
    execute: async (message, Luke, ...args) => {
        const firstMessage = (
            await message.channel.messages.fetch({ limit: 1, after: '1' })
        ).first()
        const author = firstMessage?.author

        Luke.embed({
            object: message,
            title: `First message on channel: ${
                firstMessage?.channel?.type != 'dm'
                    ? firstMessage?.channel.name
                    : "can't fetch name of the channel."
            }`,
            fields: [
                ['Content', firstMessage?.content],
                ['Author', `Username: ${author?.tag}\nID: ${author?.id}`],
            ],
            thumbnail: author?.avatarURL({ dynamic: true }),
            url: firstMessage?.url,
        })
    },
}

module.exports = command
