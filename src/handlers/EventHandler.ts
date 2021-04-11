import guildManager from '../database/guildManager'
import { Luke } from '@/client'
import { MessageEmbed, WebhookClient } from 'discord.js'
import Embed from '../modules/Embed'

export default class EventHandler {
    constructor(Luke: Luke) {
        Luke.on('ready', () => require('./events/ready')(Luke))
        Luke.on('message', (message) =>
            require('./events/message')(Luke, message)
        )
        Luke.on('messageUpdate', (oldMessage, newMessage) =>
            require('./events/messageUpdate')(Luke, newMessage)
        )
        Luke.on('voiceStateUpdate', (oldState, newState) =>
            require('./events/voiceStateUpdate')(oldState, newState)
        )
        Luke.on('guildMemberAdd', async (member) => {
            const guild = await guildManager.get(member.guild.id)
            if (
                guild.welcomer?.welcome?.enabled == true &&
                guild.welcomer?.welcome?.channel
            ) {
                const wClient = new WebhookClient(
                    guild.welcomer.welcome?.channel.webhook.id,
                    guild.welcomer?.welcome?.channel.webhook.token
                )
                if (!wClient.id || !wClient.token || !wClient.client) return
                else {
                    let message = guild.welcomer.welcome?.message
                    if (guild.welcomer?.welcome?.random_message.enabled)
                        message =
                            guild.welcomer?.welcome?.random_message.messages[
                                Math.floor(
                                    Math.random() *
                                        guild.welcomer.welcome.random_message
                                            .messages.length
                                )
                            ]
                    wClient.send(
                        <MessageEmbed>Embed({
                            title: 'Welcome',
                            description: message
                                .replace(
                                    /{user.name}/gm,
                                    member.user?.tag || 'X'
                                )
                                .replace(
                                    /{guild.name}/gm,
                                    member.guild.name || 'X'
                                ),
                            thumbnail: member.user.avatarURL({ dynamic: true }),
                            footer: 'Generated by Luke (https://lukebot.xyz)',
                            disableDescriptionCodeBlock: true,
                        })
                    )
                }
            }
        })
        Luke.on('guildMemberRemove', async (member) => {
            const guild = await guildManager.get(member.guild.id)
            if (
                guild.welcomer?.goodbye?.enabled == true &&
                guild.welcomer?.goodbye?.channel
            ) {
                const lClient = new WebhookClient(
                    guild.welcomer.goodbye.channel.webhook.id,
                    guild.welcomer?.goodbye?.channel.webhook.token
                )
                if (!lClient.id || !lClient.token || !lClient.client) return
                else {
                    let message = guild.welcomer?.goodbye?.message
                    if (guild.welcomer?.goodbye?.random_message.enabled)
                        message =
                            guild.welcomer?.goodbye?.random_message.messages[
                                Math.floor(
                                    Math.random() *
                                        guild.welcomer.goodbye.random_message
                                            .messages.length
                                )
                            ]
                    lClient.send(
                        <MessageEmbed>Embed({
                            title: 'Goodbye',
                            description: message
                                .replace(
                                    /{user.name}/gm,
                                    member.user?.tag || 'X'
                                )
                                .replace(
                                    /{guild.name}/gm,
                                    member.guild.name || 'X'
                                ),
                            thumbnail: member.user?.avatarURL({
                                dynamic: true,
                            }),
                            disableDescriptionCodeBlock: true,
                            footer: 'Generated by Luke (https://lukebot.xyz)',
                            color: '#eb4034',
                        })
                    )
                }
            }
        })
    }
}
