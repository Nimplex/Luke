import {
    ColorResolvable,
    FileOptions,
    Message,
    MessageAttachment,
    MessageEmbedAuthor,
    NewsChannel,
    PermissionResolvable,
    TextChannel,
} from 'discord.js'
import { Luke } from './index'

export type arg = { name: string; type: string; required?: boolean }
export type Field = [string, any, boolean?]

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
    dev?: boolean
    permissions?: { bot?: PermissionResolvable; user?: PermissionResolvable }
    execute: (
        message: message,
        Luke: Luke,
        ...args: any[]
    ) => Promise<boolean | void | undefined>
}

export interface Embed {
    object?: message
    attachment?: Buffer
    author?: MessageEmbedAuthor
    color?: ColorResolvable
    description?: string
    fields?: Field[]
    files?: Array<FileOptions | string | MessageAttachment>
    footer?: string
    image?: string
    thumbnail?: string | null | undefined
    timestamp?: number
    title?: string
    url?: string
    disableDescriptionCodeBlock?: boolean
    disableFieldsCodeBlock?: boolean
}

export interface message extends Message {
    channel: TextChannel | NewsChannel
}

export type channel = TextChannel | NewsChannel
