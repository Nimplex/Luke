import mongoose, { Schema, Document } from 'mongoose'

export interface User extends Document {
    messagesCount: number
    experience: number
    level: number
    uid: string
}

const UserSchema: Schema = new Schema(
    {
        messagesCount: Number,
        experience: Number,
        level: Number,
        uid: String,
    },
    { timestamps: true }
)

export default mongoose.model<User>('levels', UserSchema)
