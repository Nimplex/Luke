import chalk from 'chalk'

export default class Console {
  ready = (message: String) => console.log(`${chalk.green('[READY]')} | ${message}`)
  warn = (message: String) => console.warn(`${chalk.yellow('[WARNING]')} | ${message}`)
  error = (message: String) => console.error(`${chalk.red('[ERROR]')} | ${message}`)
}