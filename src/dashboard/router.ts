import { Application } from 'express'
import FormData from 'form-data'
import fetch from 'node-fetch'

const tokens = require('../../files/tokens.json')
const { server } = require('../../files/config.json')

export = (app: Application) => {
    // Dashboard
    app.get('/', (req, res) => res.render('index'))
    app.get('/dashboard', (req, res) => {
        res.json(req.session)
    })

    // API
    app.get('/api/login', (req, res) => {
        const code = req.query.code
        if (!code) return res.redirect('/403')

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

        fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            body: Data
        }).then(res => res.json()).then(json => {
            console.log(json)
            if (!json.access_token) return res.redirect('/400')

            fetch('https://discord.com/api/users/@me', {
                method: 'GET',
                headers: {
                    authorization: `${json.token_type} ${json.access_token}`
                }
            }).then(res => res.json()).then(user => {
                user.tag = `${user.username}#${user.discriminator}`
                user.avatarURL = user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024` : null
                req.session!.user = user

                fetch('https://discord.com/api/users/@me/guilds', {
                    method: 'GET',
                    headers: {
                        authorization: `${json.token_type} ${json.access_token}`
                    }
                }).then(res => res.json()).then(guilds => {
                    req.session!.guilds = guilds
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

    // Errors
    app.get('/403', (req, res) => res.render('403'))
    app.get('/404', (req, res) => res.render('404'))
}