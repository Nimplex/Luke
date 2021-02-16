import { Luke } from '@/index'
import dashboard from '../../dashboard/server'

module.exports = (Luke: Luke) => {
    Luke.console.ready(`${Luke.user?.tag} is ready`)
    Luke.dashboard = new dashboard()
}