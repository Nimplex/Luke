import { Luke } from '../'
import { Plugin } from '../types'
import { readdir } from 'fs'
import { join } from 'path'
import CommandHandler from './CommandHandler'

export default class PluginHandler {
    cmds: CommandHandler
    plugins: Array<Plugin>
    constructor(client: Luke) {
        this.plugins = []

        readdir(join(__dirname, '..', 'plugins'), (err, files) => {
            if (err) return client.console.error(err)
            files.forEach(file => {
                const Plugin: Plugin = require(`../plugins/${file}`)
                this.plugins.push(Plugin)
            })
            client.console.ready(`Loaded ${this.plugins.length} plugin(s).`)
        })

        this.cmds = new CommandHandler(this)
    }

    get = async(id: string): Promise<Plugin | undefined> =>
        this.plugins.find(plugin => plugin.id == id)
}