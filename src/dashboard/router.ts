import guildManager from '../database/guildManager'
import { Channel, NewsChannel, Permissions, TextChannel } from 'discord.js'
import { Application } from 'express'
import FormData from 'form-data'
import fetch from 'node-fetch'
import Luke from '..'

const tokens = require('../../files/tokens.json')
const { server } = require('../../files/config.json')

export = (app: Application) => {
    // Dashboard
    app.get('/', (req, res) => {
        let logged = true
        if (!req.session || !req.session.code || !req.session.user || !req.session.guilds) logged = false

        res.render('index', { logged: logged || false, user: req.session?.user || [] })
    })
    app.get('/dashboard', (req, res) => {
        if (!req.session || !req.session.code || !req.session.user || !req.session.guilds)
            return res.redirect(`https://discord.com/oauth2/authorize?client_id=${server.id}&redirect_uri=${process.argv[2] ? server.dev_uri : server.redirect_uri}&response_type=code&scope=identify%20guilds`)
        else {
            const guilds = req.session?.guilds

            req.session.guilds = []

            guilds.forEach((guild: { g: any, b: any }) => {
                req.session!.guilds.push({ g: guild.g, b: Luke.guilds.cache.get(guild.g.id) ? true : false })
            })

            res.render('dashboard', { user: req.session?.user, guilds: req.session?.guilds || [] })
        }
    })
    app.get('/dashboard/:id/:cat', async(req, res) => {
        const id = req.params.id
        const cat = req.params.cat

        if (!req.session || !req.session.code || !req.session.user || !req.session.guilds || !id)
            return res.redirect('/')
        if (!Luke.guilds.cache.get((id as string)))
            return res.redirect('/')

        const guild = req.session?.guilds.find((guild: any) => guild.g.id == id)
        
        if (!guild) return res.redirect('/401')

        const server = await guildManager.get(guild.g.id)
        const cacheChannels = Luke.guilds.cache.get(guild.g.id)?.channels.cache || []
        const channels: any[] = []

        cacheChannels.forEach((channel: Channel) => {
            !['category', 'voice'].includes(channel.type) ? channels.push({ n: (channel as any).name, id: channel.id }) : null
        })

        const perms = new Permissions(guild.g.permissions)
        if (perms.has(['MANAGE_GUILD', 'MANAGE_MESSAGES', 'VIEW_AUDIT_LOG'])) {
            if (cat == 'basic') 
                res.render('basic', {
                    guild: guild,
                    user: req.session.user,
                    data: server,
                    channels: channels
                })
            else if (cat == 'welcomer')
                res.render('welcomer', {
                    guild: guild,
                    user: req.session.user,
                    data: server,
                    channels: channels
                })
        } else res.redirect('/401')
    })

    // API
    app.get('/api/login', (req, res) => {
        const code = req.query.code
        if (!code) return res.redirect('/401')

        req.session!.code = code

        res.redirect('/callback')
    })
    app.get('/callback', (req, res) => {
        const Data = new FormData()
        Data.append('client_id', server.id || 'NA')
        Data.append('client_secret', tokens.secret || 'NA')
        Data.append('grant_type', 'authorization_code')
        Data.append('code', req.session?.code || 'NA')
        Data.append('redirect_uri', process.argv[2] ? server.dev_uri : server.redirect_uri)
        Data.append('scope', 'identify guilds')

        fetch('https://discord.com/api/oauth2/token', { method: 'POST', body: Data }).then(res => res.json()).then(json => {
            if (!json.access_token || json.error) return res.redirect('/401')

            fetch('https://discord.com/api/users/@me', { method: 'GET', headers: { authorization: `${json.token_type} ${json.access_token}` } }).then(res => res.json()).then(user => {
                if (user.code == 0) return res.redirect('/401')

                user.tag = `${user.username}#${user.discriminator}`
                user.avatarURL = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024` : null
                req.session!.user = user
                req.session!.token = json.access_token
                req.session!.type = json.token_type

                fetch('https://discord.com/api/users/@me/guilds', { method: 'GET', headers: { authorization: `${json.token_type} ${json.access_token}` } }).then(res => res.json()).then(guilds => {
                    if (guilds.code == 0) return res.redirect('/401')

                    req.session!.guilds = []
                    guilds.forEach((guild: any) => {
                        const perms = new Permissions(guild.permissions)
                        perms.has(['MANAGE_GUILD', 'MANAGE_MESSAGES', 'VIEW_AUDIT_LOG']) ? req.session!.guilds.push({ g: guild, b: Luke.guilds.cache.get(guild.id) ? true : false }) : null
                    })

                    res.redirect('/dashboard')
                })
            })
        })
    })
    app.get('/api/logout', (req, res) => {
        req.session?.destroy(() => {
            res.redirect('/')
        })
    })
    app.post('/api/guild/:id', async(req, res) => {
        const id = req.params.id
        if (!id) return res.json({ status: 0, msg: 'Invalid ID' })
        if (!req.body || !req.session || !req.session.guilds || !req.session.user) return res.json({ status: 0, msg: 'Invalid body' })

        const guild = req.session?.guilds.find((guild: any) => guild.g.id == id)

        const perms = new Permissions(guild.g.permissions)
        if (perms.has(['MANAGE_GUILD', 'MANAGE_MESSAGES', 'VIEW_AUDIT_LOG'])) {
            const server = await guildManager.get(id)
            let data = Object.assign(server, req.body)
            let welcome_webhook
            let goodbye_webhook
            const goodybe_messages: string[] = []
            const welcome_messages: string[] = []

            Object.values(data.welcomer.goodbye.random_message.messages || []).forEach((elem: any) => elem.length !== 0 ? goodybe_messages.push(elem) : null)
            Object.values(data.welcomer.welcome.random_message.messages || []).forEach((elem: any) => elem.length !== 0 ? welcome_messages.push(elem) : null)
            
            if (req.body.welcomer && req.body.welcomer.welcome.enabled) {
                const welcome_channel = Luke.guilds.cache.get(id)?.channels.cache.get(req.body.welcomer.welcome.channel.id)

                if (!welcome_channel || welcome_channel.type == 'category' || welcome_channel.type == 'voice') return res.json({ status: 0, msg: 'Invalid body' }) 
                if (!(await (welcome_channel as TextChannel).fetchWebhooks()).find(webhook => webhook.name == 'Welcome'))
                    welcome_webhook = await (welcome_channel as TextChannel || NewsChannel).createWebhook('Welcome', { avatar: 'https://lukebot.xyz/img/waving-hand.png' })
                else welcome_webhook = (await ((welcome_channel as TextChannel || NewsChannel).fetchWebhooks())).find(webhook => webhook.name == 'Welcome')
            }
            if (req.body.welcomer && req.body.welcomer.goodbye.enabled) {
                const goodbye_channel = Luke.guilds.cache.get(id)?.channels.cache.get(req.body.welcomer.goodbye.channel.id)

                if (!goodbye_channel || goodbye_channel.type == 'category' || goodbye_channel.type == 'voice') return res.json({ status: 0, msg: 'Invalid body' }) 
                if (!(await (goodbye_channel as TextChannel).fetchWebhooks()).find(webhook => webhook.name == 'Goodbye'))
                    goodbye_webhook = await (goodbye_channel as TextChannel || NewsChannel).createWebhook('Goodbye', { avatar: 'https://lukebot.xyz/img/waving-hand.png' })
                else goodbye_webhook = (await ((goodbye_channel as TextChannel || NewsChannel).fetchWebhooks())).find(webhook => webhook.name == 'Goodbye')
            }
            
            const data2 = Object.assign(server, {
                prefix: req.body.prefix || server.prefix,
                welcomer: {
                    welcome: {
                        enabled: data.welcomer.welcome.enabled || false,
                        channel: {
                            id: data.welcomer.welcome.channel.id || '0',
                            webhook: {
                                token: welcome_webhook?.token || '',
                                id: welcome_webhook?.id || ''
                            }
                        },
                        message: data.welcomer.welcome.message || server.welcomer.welcome.message,
                        random_message: {
                            enabled: data.welcomer.welcome.random_message.enabled || false,
                            messages: welcome_messages
                        }
                    },
                    goodbye: {
                        enabled: data.welcomer.goodbye.enabled || false,
                        channel: {
                            id: data.welcomer.goodbye.channel.id || '0',
                            webhook: {
                                token: goodbye_webhook?.token || '',
                                id: goodbye_webhook?.id || ''
                            }
                        },
                        message: data.welcomer.goodbye.message || server.welcomer.goodbye.message,
                        random_message: {
                            enabled: data.welcomer.goodbye.random_message.enabled || false,
                            messages: goodybe_messages
                        }
                    }
                }
            })
            
            await server.updateOne(data2)
            
            res.json({ status: 1 })
        } else
            res.json({ status: 0, msg: 'Invalid permissions.' })
    })

    // Errors
    app.get('/401', (req, res) => res.status(401).render('401'))
    app.get('/404', (req, res) => res.status(404).render('404'))
    app.get('/*', (req, res) => res.redirect('/404'))
}