import { Luke } from '@/index'
import { Plugin } from '@/types'
import { readdir } from 'fs'
import { join } from 'path'

export default class PluginHandler {
    plugins: Plugin[]

    constructor(Luke: Luke) {
        this.plugins = []
        readdir(join(__dirname, '..', 'plugins'), (err, dirs) => {
            if (err) return Luke.console.error(err)
            else {
                dirs.forEach(dir => {
                    const plugin: Plugin = require(`../plugins/${dir}`)
                    this.plugins.push(plugin)
                })
                Luke.console.log(`Loaded ${this.plugins.length} plugin(s)`)
            }
        })
    }
}