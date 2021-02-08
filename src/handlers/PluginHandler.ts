import { Luke } from '../'
import { Plugin } from '../types'
import { readdir } from 'fs'
import { join } from 'path'
import CommandHandler from './CommandHandler'

export default class PluginHandler {
    cmds: CommandHandler
    plugins: Array<Plugin>
    constructor(client: Luke) {
        readdir(join(__dirname, '..', 'plugins'), (err, files) => {
            if (err) return Luke.console.error(err)
            files.forEach(file => {
                const Plugin: Plugin = require(`../plugins/${file}`)
                this.plugins.push(Plugin)
            })
            Luke.console.ready(`Loaded ${this.plugins.length} plugins.`)
        })
        this.cmds = new CommandHandler(this)
    }

    get = async(id: string): Promise<Plugin | undefined> =>
        this.plugins.find(plugin => plugin.id == id)
}