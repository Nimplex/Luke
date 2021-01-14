import Luke, { Command } from '../../../index'

export const data: Command['data'] = {
  triggers: ['calc', 'calculator', 'calculate'],
  description: 'Calculator.',
  usage: '<number>',
  botPermissions: ['SEND_MESSAGES'],
  execute: async(message, ...args) => {
    if (!args[0]) return false

    let final: any[] = []
    args.forEach((arg: string) => {
      const splited: string[] = arg.split('')
      splited.forEach(number => {
        if (!isNaN(parseInt(number))) final.push(number)
        else if (['(', ')', '+', '-', '*', '^', '/', '.', ',', 'e'].includes(number)) final.push(number.replace(/\^/gm, '**'))
      })
    })
    const joined = final.join('')
    let result: any
    try {
      result = await eval(joined)
    } catch {
      return false
    }
    return {
      title: ':1234: Calculator',
      description: result || '0',
    }
  }
}