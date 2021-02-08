import { BitFieldResolvable, ColorResolvable, FileOptions, Message, MessageAttachment, PermissionString, StringResolvable } from 'discord.js'

export interface Plugin {
    name: string
    id: string
    hide?: boolean
    commands: Array<Command>
}
export interface Command {
    triggers: Array<string>
    description: string
    usage?: string
    developer?: boolean
    hide?: boolean
    permissions?: PermissionArray
    execute: (message: Message, ...args: Array<string>) => Promise<Embed | boolean>
}
export interface Embed {
    fields?: Array<Field>
    files?: Array<string | FileOptions | MessageAttachment>
    author?: { text: StringResolvable, icon?: string }
    color?: ColorResolvable
    description?: StringResolvable
    footer?: StringResolvable
    image?: string
    thumbnail?: string | null | undefined
    timestamp?: Date | number
    title?: StringResolvable
    url?: string
}

export type Field = [string, any | any[], boolean?]
export type PermissionBitField = BitFieldResolvable<PermissionString>
export type PermissionArray = { user?: PermissionBitField, bot?: PermissionBitField }