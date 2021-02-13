import { Luke } from '../'

export default class EventHandler {
    constructor(Luke: Luke) {
        Luke.on('ready', () => Luke.console.ready(`${Luke.user?.tag} is ready`))
    }
}