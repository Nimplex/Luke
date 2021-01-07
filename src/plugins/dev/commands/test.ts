import { CommandOutput } from './../../../index'

export const data = {
  triggers: ['test'],
  description: '',
  usage: '',
  dev: false,
  execute: async({ message, args = []}: CommandOutput) => {
    return {
      description: args[0]
    }
  }
}