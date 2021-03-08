import guildModel, { Guild } from '../models/guild.model'

export const create = async(id: string): Promise<Guild> => {
    const guild =
        await guildModel.create({
            gid: id,
            prefix: '.',
            welcomer: {
                welcome: {
                    enabled: false,
                    channel: {
                        id: '',
                        webhook: {
                            id: '',
                            token: ''
                        }
                    },
                    message: 'Welcome **{user.name}** to **{guild.name}**',
                    random_message: {
                        enabled: false,
                        messages: []
                    }
                },
                goodbye: {
                    enabled: false,
                    channel: {
                        id: '',
                        webhook: {
                            id: '',
                            token: ''
                        }
                    },
                    message: 'Goodbye **{user.name}**',
                    random_message: {
                        enabled: false,
                        messages: []
                    }
                }
            },
            automoderator: {
                spam: false,
                invites: false
            }
        }); guild.save()

    return guild
}

export const get = async(id: string): Promise<Guild> => {
    let guild = await guildModel.findOne({ gid: id }) || undefined
    if (!guild) guild = await create(id)
    return guild
}

export default {
    create: create,
    get: get
}