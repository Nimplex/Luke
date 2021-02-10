import { yellow, cyan, green, red, gray } from 'chalk'

export default class Console {
    colorize = (type: string) => `${gray('(')}${cyan('Luke')} ${gray('[')}${type}${gray(']')}${gray(')')}`
    warn = (message: any) => console.warn(`⚠️ ${this.colorize(yellow('WARN'))} ${message}`)
    ready = (message: any) => console.log(`🚀 ${this.colorize(green('READY'))} ${message}`)
    error = (message: any) => console.error(`❌ ${this.colorize(red('ERROR'))} ${message}`)
}