import { Application } from 'express'
import fetch from 'node-fetch'
import FormData from 'form-data'

const tokens = require('../../files/tokens.json')

// TODO: Fix express-session

export = (app: Application) => {
    // Dashboard
    app.get('/', (req, res) => res.render('index'))
    app.get('/dashboard', (req, res) => {
        if (!req.session?.body || !req.session?.code) return res.redirect('/403')
        res.json(req.session.body)
    })

    // API
    app.get('/api/login', (req, res) => {
        console.log(req, req.body)
        if (req.session) req.session.code = req.query.code
        res.redirect('/dashboard')
    })
    app.get('/api/logout', (req, res) => {
        req.session?.destroy(() => {
            res.redirect('/')
        })
    })
    app.get('/callback', (req, res) => {
        const data = new FormData()
        data.append('client_id', tokens.id)
        data.append('client_secret', tokens.secret)
        data.append('grant_type', 'authorization_code')
        data.append('redirect_uri', 'https://lukebot.xyz/api/login')
        data.append('scope', ['identify', 'guilds'])
        data.append('code', req.session!.code)

        fetch('https://discordapp.com/api/oauth2/token', {
            method: 'POST',
            body: data
        }).then(res => res.json()).then(response => {
            fetch('https://discord.com/api/users/@me', {
                method: 'GET',
                headers: {
                    authorization: `${response.token_type} ${response.access_token}`
                },
            })
            .then(res2 => res2.json())
            .then(userResponse => {
                userResponse.tag = `${userResponse.username}#${userResponse.discriminator}`
                userResponse.avatarURL = userResponse.avatar ? `https://cdn.discordapp.com/avatars/${userResponse.id}/${userResponse.avatar}.png?size=1024` : null

                if (req.session) req.session!.body = userResponse
                res.redirect('/dashboard')
            })
        })
    })
}