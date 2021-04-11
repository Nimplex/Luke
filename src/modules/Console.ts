import { yellow, green, red, cyan } from 'chalk'

export default {
    warn: (message: any) => console.warn(`${yellow('WARN')}  ${message}`),
    ready: (message: any) => console.log(`${green('READY')} ${message}`),
    error: (message: any) => console.error(`${red('ERROR')} ${message}`),
    log: (message: any) => console.log(`${cyan('LOG')}   ${message}`),
}
