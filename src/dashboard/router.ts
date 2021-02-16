import { Application } from 'express'
import fetch from 'node-fetch'
import FormData from 'form-data'

const tokens = require('../../files/tokens.json')

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

        req.session!['code'] = code

        res.redirect('/dashboard')
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