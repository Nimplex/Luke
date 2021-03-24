import { Command } from '@/types'
import dayjs from 'dayjs'

const command: Command = {
    triggers: ['stats'],
    description: 'Shows bot stats.',
    execute: async (message, Luke, ...args) => {
        let days = 0
        let week = 0
        let uptime = ''
        let totalSeconds = (Luke?.uptime || 0) / 1000
        let hours = Math.floor(totalSeconds / 3600)
        totalSeconds %= 3600
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = Math.floor(totalSeconds % 60)
        if (hours > 24) {
            days = days + 1
            hours = 0
        }
        if (week - 0) uptime += `${week} week, `
        if (minutes > 60) minutes = 0
        uptime += `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`

        Luke.embed({
            object: message,
            fields: [
                ['Guilds', Luke.guilds.cache.size, true],
                ['Channels', Luke.channels.cache.size, true],
                ['Members', Luke.users.cache.size, true],
                ['Uptime', uptime, true],
                ['Ping', `${Luke.ws.ping}ms`, true],
            ],
        })
    },
}

module.exports = command
