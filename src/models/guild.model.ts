import mongoose, { Schema, Document } from 'mongoose'

export interface Guild extends Document {
    prefix: string
    welcome_channel: string
    leave_channel: string,
    gid: string,
    wenabled: boolean,
    lenabled: boolean
}

const GuildSchema: Schema = new Schema({
    prefix: { type: String, required: true },
    welcome_channel: { type: String, required: false },
    leave_channel: { type: String, required: false },
    gid: { type: String, required: true, unique: true },
    wenabled: { type: Boolean, required: false },
    lenabled: { type: Boolean, required: false }
})

export default mongoose.model<Guild>('guilds', GuildSchema)