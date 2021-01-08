import { Luke } from '../index'

export default class EventHandler {
  constructor(Luke: Luke) {
    Luke.on('ready', () => require('../events/ready')._(Luke))
    Luke.on('message', message => require('../events/message')._(message, Luke))
  }
}