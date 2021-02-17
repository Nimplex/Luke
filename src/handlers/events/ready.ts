import { Luke } from '@/index'
import { argv } from 'process'
import dashboard from '../../dashboard/server'

module.exports = (Luke: Luke) => {
    Luke.console.ready(`${Luke.user?.tag} is ready`)
    Luke.dashboard = new dashboard()
    argv[2] ?
        Luke.console.warn('Development version is running'):
        Luke.console.log('Production version is running')
}