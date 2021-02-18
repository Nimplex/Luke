import guildModel, { Guild } from '../models/guild.model'

export async function create(id: string): Promise<Guild> {
    const guild =
        await guildModel.create({
            prefix: '.',
            welcome_channel: '',
            leave_channel: '',
            gid: id,
            lenabled: false,
            wenabled: false,
            leave_id: '',
            leave_token: '',
            welcome_id: '',
            welcome_token: '',
            wmenabled: false,
            lmenabled: false,
            wmessages: [],
            lmessages: []
        }); guild.save()

    return guild
}

export async function get(id: string): Promise<Guild> {
    let guild = await guildModel.findOne({ gid: id }) || undefined
    if (!guild) guild = await create(id)
    return guild
}

export default {
    create: create,
    get: get
}