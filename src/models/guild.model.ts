import mongoose, { Schema, Document } from 'mongoose'

// export interface Guild extends Document {
//     prefix: string
//     welcome_channel: string
//     leave_channel: string
//     gid: string
//     wenabled: boolean
//     lenabled: boolean
//     welcome_id: string
//     welcome_token: string
//     leave_id: string
//     leave_token: string
//     lmessages: []
//     wmessages: []
//     wmenabled: boolean
//     lmenabled: boolean
// }
// const GuildSchema: Schema = new Schema({
//     prefix: { type: String, required: true },
//     welcome_channel: { type: String, required: false },
//     leave_channel: { type: String, required: false },
//     gid: { type: String, required: true, unique: true },
//     wenabled: { type: Boolean, required: false },
//     lenabled: { type: Boolean, required: false },
//     welcome_id: { type: String, required: false },
//     welcome_token: { type: String, required: false },
//     leave_id: { type: String, required: false },
//     leave_token: { type: String, required: false },
//     lmessages: { type: [], required: false },
//     wmessages: { type: [], required: false },
//     rmenabled: { type: Boolean, required: false },
//     lmenabled: { type: Boolean, required: false },
// }, { timestamps: true })

export interface Guild extends Document {
    prefix: string
    gid: string
    welcomer: {
        welcome: {
            enabled: boolean
            channel: {
                id: string
                webhook: {
                    token: string
                    id: string
                }
            }
            message: string
            random_message: {
                enabled: boolean
                messages: string[]
            }
        },
        goodbye: {
            enabled: boolean
            channel: {
                id: string
                webhook: {
                    token: string
                    id: string
                }
            }
            message: string
            random_message: {
                enabled: boolean,
                messages: string[]
            }
        }
    }
}

const GuildSchema: Schema = new Schema({
    prefix: String,
    gid: { type: String, unique: true },
    welcomer: {
        welcome: {
            enabled: Boolean,
            channel: {
                id: String,
                webhook: {
                    token: String,
                    id: String
                }
            },
            message: String,
            random_message: {
                enabled: Boolean,
                messages: []
            }
        },
        goodbye: {
            enabled: Boolean,
            channel: {
                id: String,
                webhook: {
                    token: String,
                    id: String
                }
            },
            message: String,
            random_message: {
                enabled: Boolean,
                messages: []
            }
        }
    }
}, { timestamps: true })

export default mongoose.model<Guild>('guilds', GuildSchema)