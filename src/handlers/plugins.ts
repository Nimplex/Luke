import { Luke, Plugin } from '../index'
import fs from 'fs'

export default class PluginHandler {
  plugins: Plugin[]
  constructor(Luke: Luke) {
    Luke.plugins = []
    fs.readdir(`${__dirname}/../plugins`, (err, files) => {
      if (err) return Luke.console.error(err)
      files.forEach(file => {
        const Plugin = require(`../plugins/${file}`)
        Luke.plugins.push(Plugin)
      })
      Luke.console.ready(`Loaded ${Luke.plugins.length} plugins.`)
    })
    this.plugins = Luke.plugins
  }
  get = async(id: string): Promise<Plugin | undefined> =>
    this.plugins.find(plugin => plugin.data.id == id)
}