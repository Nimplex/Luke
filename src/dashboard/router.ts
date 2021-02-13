import { Application } from 'express'

export = (app: Application) => {
    app.get('/', (req, res) => res.render('index'))
}