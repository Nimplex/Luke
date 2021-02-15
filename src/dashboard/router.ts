import { Application } from 'express'

export = (app: Application) => {
    // Dashboard
    app.get('/', (req, res) => res.render('index'))

    // API
    app.post('/api/login', (req, res) => {
        console.log(req, req.body)
    })
}