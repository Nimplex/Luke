import { Luke } from '../index'

export const _ = async(Luke: Luke) => {
  Luke.user?.setPresence({ status: 'idle', activity: { name: `${Luke.config.prefix}help`, type: 'LISTENING' } })
  Luke.console.ready(`${Luke.user?.tag} is ready!`)
}