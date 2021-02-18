import guildManager from '../database/guildManager'
import { Permissions } from 'discord.js'
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
    app.get('/dashboard/:id', async(req, res) => {
        const id = req.params.id

        if (!req.session || !req.session.code || !req.session.user || !req.session.guilds || !id)
            return res.redirect('/')
        if (!Luke.guilds.cache.get((id as string)))
            return res.redirect('/')

        const guild = req.session?.guilds.find((guild: any) => guild.g.id == id)
        
        if (!guild) return res.redirect('/401')

        let server = await guildManager.get(guild.g.id)
        if (!server) await guildManager.create(guild.g.id)
            server = await guildManager.get(guild.g.id)
        if (!server) return res.redirect('/500')

        const perms = new Permissions(guild.g.permissions)
        perms.has(['MANAGE_GUILD', 'MANAGE_MESSAGES', 'VIEW_AUDIT_LOG']) ?
            res.render('guild', { guild: guild, user: req.session.user, data: { prefix: server?.prefix || '.', token: req.session.token || '0' }, session_id: req.sessionID }) :
            res.redirect('/401')
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
        if (!req.session?.user) return res.json({ status: 0, msg: 'Session is dead' })
        if (!req.body.prefix) return res.json({ status: 0, msg: 'Invalid body' })
        
        const guild = req.session?.guilds.find((guild: any) => guild.g.id == id)
        if (!guild) return res.json({ status: 0 })

        const perms = new Permissions(guild.g.permissions)
        if (perms.has(['MANAGE_GUILD', 'MANAGE_MESSAGES', 'VIEW_AUDIT_LOG'])) {
            let server = await guildManager.get(guild.g.id)
            if (!server) server = await guildManager.create(guild.g.id)
            await server.updateOne({ prefix: req.body.prefix })

            res.json({ status: 1 })
        } else
            res.json({ status: 0, msg: 'Invalid permissions.' })
    })

    // Errors
    app.get('/401', (req, res) => res.status(401).render('401'))
    app.get('/404', (req, res) => res.status(404).render('404'))
}