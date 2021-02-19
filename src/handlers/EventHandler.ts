import guildManager from '../database/guildManager'
import { Luke } from '@/index'
import { WebhookClient } from 'discord.js'
import Embed from '../modules/Embed'

export default class EventHandler {
    constructor(Luke: Luke) {
        Luke.on('ready', () => require('./events/ready')(Luke))
        Luke.on('message', message => require('./events/message')(Luke, message))
        // Luke.on('guildMemberAdd', async member => {
        //     const guild = await guildManager.get(member.guild.id)
        //     if (guild.wenabled == true && guild.welcome_channel && guild.welcome_id && guild.welcome_token) {
        //         const wClient = new WebhookClient(guild.welcome_id, guild.welcome_token)
        //         if (!wClient.id || !wClient.token || !wClient.client) return
        //         else wClient.send(Embed({
        //             title: 'Welcome',
        //             description: `Welcome, **${member.user.tag}** to the **${member.guild.name}**`,
        //             thumbnail: member.user.avatarURL({ dynamic: true }),
        //             disableDescriptionCodeBlock: true
        //         }))
        //     }
        // })
        // Luke.on('guildMemberRemove', async member => {
        //     const guild = await guildManager.get(member.guild.id)
        //     if (guild.lenabled == true && guild.leave_channel && guild.leave_id && guild.leave_token) {
        //         const wClient = new WebhookClient(guild.leave_id, guild.leave_token)
        //         if (!wClient.id || !wClient.token || !wClient.client) return
        //         else wClient.send(Embed({
        //             title: 'Goodbye',
        //             description: `Goodbye **${member.user?.tag}**`,
        //             thumbnail: member.user?.avatarURL({ dynamic: true }),
        //             disableDescriptionCodeBlock: true,
        //             color: '#eb4034'
        //         }))
        //     }
        // })
    }
}