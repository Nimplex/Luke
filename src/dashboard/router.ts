import { Application } from 'express'

export = (app: Application) => {
    // Dashboard
    app.get('/', (req, res) => res.render('index'))
    app.get('/dashboard', (req, res) => {
        if (!req.session?.body) return res.redirect('/403')
        res.json(req.session.body)
        // res.render('dashboard', { body: req.session?.body })
    })

    // API
    app.post('/api/login', (req, res) => {
        console.log(req, req.body)
        if (req.session) req.session.body = req.body
        res.redirect('/dashboard')
    })
    app.get('/api/logout', (req, res) => {
        req.session?.destroy(() => {
            res.redirect('/')
        })
    })
}