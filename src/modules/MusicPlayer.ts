import { MessageEmbed, TextChannel, User } from 'discord.js'
import { Player, Track } from 'erela.js'
import Luke from '..'

export class MusicPlayer {
    private guild: string
    private voiceChannel: string
    private textChannel: TextChannel
    public manager: Player

    constructor(guild: string, voiceChannel: string, textChannel: TextChannel) {
        this.guild = guild
        this.voiceChannel = voiceChannel
        this.textChannel = textChannel
        this.manager = Luke.manager.create({
            guild: this.guild,
            voiceChannel: this.voiceChannel,
            textChannel: this.textChannel.id,
            selfDeafen: true,
            volume: 50,
        })
    }

    isValidURL(url: string) {
        return /^https?:\/\/((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i.test(
            url
        )
    }

    async search(query: string, author: User) {
        if (!this.isValidURL(query)) query = `youtube:${query}`
        return await this.manager.search(query, author)
    }

    addToQueue(track: Track) {
        this.manager.queue.add(track)
    }

    findQueue(track: Track) {
        return this.manager.queue.find((t) => t === track)
    }

    clearQueue() {
        this.manager.queue.clear()
    }

    removeFromQueue(position: number) {
        this.manager.queue.remove(position)
    }

    async play() {
        this.manager.setVoiceChannel(this.voiceChannel)
        this.manager.setTextChannel(this.textChannel.id)
        await this.manager.play()
        const currentTrack = this.manager.queue.current
        this.textChannel.send(
            new MessageEmbed()
                .setThumbnail(<string>currentTrack?.thumbnail)
                .setTitle(':notes: | Now playing')
                .setColor('#efefef')
                .setDescription(
                    `\`\`\`Title: ${currentTrack?.title}\nAuthor: ${currentTrack?.author}\`\`\``
                )
                .setTimestamp(new Date())
        )
    }

    skip(to = 1) {
        if (!this.manager) return
        if (to > 1) {
            this.manager.queue.unshift(this.manager.queue[to - 1])
            this.manager.queue.splice(to, 1)
        }
        this.manager.stop()
    }

    leave() {
        this.manager.queue.clear()
        this.clearQueue()
        this.textChannel.send(
            new MessageEmbed()
                .setTitle(':x: | Left voice channel!')
                .setColor('#efefef')
                .setTimestamp(new Date())
        )
        return this.manager.disconnect()
    }

    setVolume(volume: number) {
        return this.manager.setVolume(volume)
    }

    pause() {
        this.manager.pause(true)
        return this.manager.paused
    }

    resume() {
        this.manager.pause(false)
        return this.manager.paused
    }

    nowplaying() {
        return this.manager.queue.current
    }

    connect() {
        return this.manager.connect()
    }
}
