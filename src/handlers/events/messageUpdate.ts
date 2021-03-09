import guildManager from '../../database/guildManager'
import { Luke } from '@/index'
import { message } from '@/types'

module.exports = async (Luke: Luke, message: message) => {
    if (message.author.bot || !message.guild) return

    const guild = await guildManager.get(message.guild.id)

    if ((!message.member?.permissions.has('MANAGE_MESSAGES') && guild.automoderator.spam) && message.mentions.members && message.mentions.members?.size >= 3) {
        message.delete()
        message.reply('Don\'t spam!')
    }
    if ((!message.member?.permissions.has('MANAGE_MESSAGES') && guild.automoderator.invites) && message.content.includes('discord.gg')) {
        message.delete()
        message.reply('Don\'t send invites!')
    }
}