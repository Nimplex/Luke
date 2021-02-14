import { Message, PermissionResolvable } from 'discord.js'
import { Luke } from './index'

export type arg = { name: string }

export interface Plugin {
    name: string
    id: string
    commands: Command[]
    nsfw?: boolean
    hide?: boolean
}

export interface Command {
    triggers: string[]
    description: string
    usage?: arg[]
    hide?: boolean
    nsfw?: boolean
    permissions?: { bot?: PermissionResolvable, user?: PermissionResolvable }
    execute: (message: Message, Luke: Luke, ...args: any[]) => Promise<boolean | void | undefined>
}