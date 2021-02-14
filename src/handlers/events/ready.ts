import { Luke } from '@/index'

module.exports = (Luke: Luke) => {
    Luke.console.ready(`${Luke.user?.tag} is ready`)
}