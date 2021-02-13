import { Client, ClientOptions } from 'discord.js'
import Console from './modules/Console'
import dashboard from './dashboard/server'

const tokens = require('../files/tokens.json')

export class Luke extends Client {
    dashboard: dashboard

    constructor(options?: ClientOptions) {
        super(options)

        this.dashboard = new dashboard()

        this.login(tokens.bot)
    }
}