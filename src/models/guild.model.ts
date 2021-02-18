import mongoose, { Schema, Document } from 'mongoose'

export interface Guild extends Document {
    prefix: string
    welcome_channel: string
    leave_channel: string
    gid: string
    wenabled: boolean
    lenabled: boolean
    welcome_id: string
    welcome_token: string
    leave_id: string
    leave_token: string
    lmessages: []
    wmessages: []
    wmenabled: boolean
    lmenabled: boolean
}

const GuildSchema: Schema = new Schema({
    prefix: { type: String, required: true },
    welcome_channel: { type: String, required: false },
    leave_channel: { type: String, required: false },
    gid: { type: String, required: true, unique: true },
    wenabled: { type: Boolean, required: false },
    lenabled: { type: Boolean, required: false },
    welcome_id: { type: String, required: false },
    welcome_token: { type: String, required: false },
    leave_id: { type: String, required: false },
    leave_token: { type: String, required: false },
    lmessages: { type: [], required: false },
    wmessages: { type: [], required: false },
    rmenabled: { type: Boolean, required: false },
    lmenabled: { type: Boolean, required: false },
}, { timestamps: true })

export default mongoose.model<Guild>('guilds', GuildSchema)