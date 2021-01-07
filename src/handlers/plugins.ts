import { Luke } from '../index'
import fs from 'fs'

export default class PluginHandler {
  constructor(Luke: Luke) {
    fs.readdir(`${__dirname}/../plugins`, (err, files) => {
      if (err) return Luke.console.error(err)
      files.forEach(file => {
        const Plugin = require(`../plugins/${file}`)
        Luke.plugins.push(Plugin)
        Luke.console.log(`"${Plugin.data.id}" plugin loaded.`)
      })
    })
  }
}