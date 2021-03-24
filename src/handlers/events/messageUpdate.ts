import guildManager from "../../database/guildManager"
import { Luke } from "@/index"
import { message } from "@/types"

module.exports = async (Luke: Luke, message: message) => {
    if (message.author.bot || !message.guild) return

    const guild = await guildManager.get(message.guild.id)

    if (
        !message.member?.permissions.has("MANAGE_MESSAGES") &&
        guild.automoderator?.spam &&
        ((message.mentions.members && message.mentions.members?.size > 3) ||
            (message.mentions.roles && message.mentions.roles?.size > 2))
    ) {
        message.delete()
        message.reply("Don't spam!")
    }
    guild.automoderator?.blacklist.forEach((word) => {
        if (word == "") return
        if (
            message.content.includes(word) ||
            message.content.includes(Buffer.from(word).toString("base64"))
        ) {
            message.delete()
            message.reply("This word isn't allowed on this guild!")
        }
    })
    if (
        !message.member?.permissions.has("MANAGE_MESSAGES") &&
        guild.automoderator?.invites
    ) {
        let invite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i
        if (invite.test(message.content)) {
            message.delete()
            message.reply("Don't send invites!")
        }
    }
}
