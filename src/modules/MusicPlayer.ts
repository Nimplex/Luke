import {  StreamDispatcher, VoiceConnection } from 'discord.js'
import ytdl from 'ytdl-core'
import Embed from './Embed'
import { message } from '../types'

export type track = {
    requester: {
        id: string
        username: string
    }
    music: {
        url: string
        title: string
        position: number
        thumbnail: string
    }
}

export class Player {
    queue: track[]
    connection: VoiceConnection
    guildID: string
    channelID: string
    paused: boolean = false
    volume: number = 100
    playing?: StreamDispatcher

    constructor(guildID: string, channelID: string, connection: VoiceConnection) {
        this.queue = []
        this.guildID = guildID
        this.channelID = channelID
        this.connection = connection
    }

    // -------------------------------------------- //
    
    getPaused(): boolean { return this.paused }
    getVolume(): number { return this.volume }
    getTrack(position: number): track | null {
        const track = this.queue.find(track => track.music.position === position)
        return track || null
    }
    getPlayer(): VoiceConnection | null {
        return this.connection || null
    }
    getQueue(): track[] {
        return this.queue
    }
    async addTrack(requester: track['requester'], track: { url: string }): Promise<track> {
        const { videoDetails } = await ytdl.getInfo(track.url)
        const newTrack: track = {
            requester,
            music: {
                url: track.url,
                title: videoDetails.title,
                thumbnail: <any> videoDetails.thumbnails[0].url,
                position: (this.queue[this.queue.length - 1]?.music.position + 1) || 1 
            }
        }
        this.queue.push(newTrack)
        return newTrack
    }
    nextTrack(message: message): track | undefined {
        this.queue.shift()
        this.playTrack(message)
        return this.queue[0]
    }
    removeTrack(position: number): boolean {
        const index = this.queue.findIndex(track => track.music.position === position)
        delete this.queue[index]
        if (this.getTrack(index + 1) !== null) {
            this.queue.forEach(track => {
                const secondIndex = this.queue.findIndex(({ music }: track) => music.position === track.music.position)
                if (track.music.position > index) this.queue[secondIndex].music.position -= 1
            })
        }
        return true
    }

    // -------------------------------------------- //

    setVolume(volume: number): number {
        const vol = volume / 100
        this.connection.dispatcher.setVolume(vol)
        this.volume = vol
        return this.volume
    }
    pausePlayer(): boolean {
        this.connection.dispatcher.pause(true)
        this.paused = true
        return this.paused
    }
    resumePlayer(): boolean {
        this.connection.dispatcher.resume()
        this.paused = false
        return !this.paused
    }
    playTrack(message: message) {
        this.playing = this.connection.play(ytdl(this.queue[0].music.url, { filter: 'audioonly' }))
        if (this.queue.length == 0) {
            Embed({
                object: message,
                title: ':wave: Queue is empty, leaving voice channel.'
            })
            message.member?.voice.channel?.leave()
            // @ts-expect-error
            Luke.cache[message.guild.id] = undefined
        }
        Embed({
            object: message,
            title: `:notes: Now playing`,
            description: `Title: ${this.queue[0].music.title}`,
            thumbnail: this.queue[0].music.thumbnail
        })
        this.playing.on('finish', () => {
            Embed({ object: message, title: ':x: Track ended' })
            this.nextTrack(message)
        })
        return true
    }

    // -------------------------------------------- //
}