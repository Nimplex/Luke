import guildManager from '../../../database/guildManager'
import { Command } from '@/types'

const command: Command = {
    triggers: ['delete-guild', 'dg'],
    description: 'Delete guild from database.',
    dev: true,
    execute: async(message, Luke, ...args) => {
        (await guildManager.get((message.guild as any).id)).remove()
        message.channel.send('ok')
    }
}

module.exports = command