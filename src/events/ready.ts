import { Luke } from '../index'

export const _ = async(Luke: Luke) => 
  Luke.console.ready(`${Luke.user?.tag} is ready!`)
