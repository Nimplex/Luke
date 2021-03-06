import { Luke } from '@/index'
import { Message } from 'discord.js'
import userModel, { User } from '../models/user.model'

export default class LevelManager {
    private Luke

    constructor(Luke: Luke) {
        this.Luke = Luke
    }

    async create(id: string): Promise<User> {
        const user = await userModel.create({
            uid: id,
            messagesCount: 0,
            level: 0,
            experience: 0
        })
        return user
    }

    async get(id: string): Promise<User> {
        let user = await userModel.findOne({ uid: id })
        if (!user) user = await this.create(id)
        user.level = await this.getLevel(id)
        await user.save()
        return user
    }

    async getLevel(id: string): Promise<number> {
        let user = await userModel.findOne({ uid: id })
        if (!user) user = await this.create(id)
        return Math.floor(user.experience / 1000)
    }

    async increase(id: string, xp: number, message: Message): Promise<User> {
        let user = await this.get(id)
        user.experience += xp
        user.messagesCount += 1
        await user.save()
        const currentLevel = await this.getLevel(id)
        if (user.level != currentLevel) message.channel.send(`Congratulations ${message.author}, you leveled up!\n Your current level is ${currentLevel}`)
        return user
    }
}