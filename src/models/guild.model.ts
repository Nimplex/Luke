import mongoose, { Schema, Document } from 'mongoose'

export interface Guild extends Document {
    prefix: string
    welcome_channel: string
    leave_channel: string,
    gid: string
}

const GuildSchema: Schema = new Schema({
    prefix: { type: String, required: true },
    welcome_channel: { type: String, required: false },
    leave_channel: { type: String, required: false },
    gid: { type: String, required: true, unique: true }
})

export default mongoose.model<Guild>('guilds', GuildSchema)