import chalk from 'chalk'

export default class Console {
  ready = (message: any) => console.log(`${chalk.green('[READY]')} | ${message}`)
  warn = (message: any) => console.warn(`${chalk.yellow('[WARNING]')} | ${message}`)
  error = (message: any) => console.error(`${chalk.red('[ERROR]')} | ${message}`)
  log = (message: any) => console.error(`${chalk.cyan('[LOG]')} | ${message}`)
}