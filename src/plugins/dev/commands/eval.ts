import fetch from 'node-fetch'
import Luke, { Command } from './../../../index'

export const data: Command['data'] = {
  triggers: ['eval'],
  description: 'Eval code.',
  usage: '<code>',
  dev: true,
  botPermissions: ['SEND_MESSAGES'],
  execute: async(message, ...args) => {
    let evaled, output
    try {
      evaled = await eval(args[0])
      output = evaled.length >= 2000 ? evaled : await fetch(`https://hastebin.com/documents`, { method: 'post', body: evaled }).then(res => res.json()).then(json => json.key)
    } catch (err) {
      output = 'error'
    }
    return {
      title: ':gear: eval.',
      color: output == 'error' ? Luke.colors.error : Luke.colors.done,
      fields: [
        [':outbox_tray: Output', output]
      ]
    }
  }
}