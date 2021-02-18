import guildModel, { Guild } from '../models/guild.model'

export async function create(id: string): Promise<Guild> {
    const guild =
        await guildModel.create({
            prefix: '.',
            welcome_channel: '',
            leave_channel: '',
            gid: id
        }); guild.save()

    return guild
}

export async function get(id: string): Promise<Guild | undefined> {
    const guild = await guildModel.findOne({ gid: id }) || undefined
    return guild
}

export default {
    create: create,
    get: get
}