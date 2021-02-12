import { BitFieldResolvable, ColorResolvable, FileOptions, Message, MessageAttachment, NewsChannel, PermissionString, StringResolvable, TextChannel } from 'discord.js'

export interface Plugin {
    name: string
    id: string
    hide?: boolean
    commands: Array<Command>
}
export interface message extends Message{
    channel: TextChannel | NewsChannel
}
export interface Command {
    triggers: Array<string>
    description: string
    usage?: string
    developer?: boolean
    hide?: boolean
    permissions?: PermissionArray
    execute: (message: message, ...args: Array<string>) => Promise<Embed | undefined>
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
    url?: string,
    dcodeblock?: boolean
}

export type Field = [string, any | any[], boolean?]
export type PermissionBitField = BitFieldResolvable<PermissionString>
export type PermissionArray = { user?: PermissionBitField, bot?: PermissionBitField }