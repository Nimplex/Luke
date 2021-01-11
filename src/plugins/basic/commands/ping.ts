import Luke, { Command } from './../../../index'

export const data: Command['data'] = {
  triggers: ['ping'],
  description: 'Shows bot ping.',
  botPermissions: ['SEND_MESSAGES'],
  execute: async(message, ...args) => {
    const messageTimestamp = Date.now() - message.createdTimestamp
    const messagePing = new Date(messageTimestamp).getMilliseconds()
    const clientPing = Math.round(Luke.ws.ping)
    return {
      title: ':ping_pong: ping.',
      fields: [
        ['Message', `${messagePing}ms`, true],
        ['API', `${clientPing}ms`, true]
      ]
    }
  }
}