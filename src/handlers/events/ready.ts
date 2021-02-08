import { Luke } from '../../'

export default (client: Luke): void => {
    client.console.ready(`${client.user?.tag} is ready!`)
}