import { Luke } from '../index'

export default class EventHandler {
  constructor(Luke: Luke) {
    Luke.on('ready', () => 
      Luke.console.ready(`${Luke.user?.tag} is ready!`)
    )
    Luke.on('message', message => require('../events/message')._(message, Luke))
  }
}