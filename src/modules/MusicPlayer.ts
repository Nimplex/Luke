import { VoiceConnection } from 'discord.js'

export type track = {
    requester: {
        id: string
        username: string
    }
    music: {
        url: string
        title: string
        thumbnail: string
        position: number
    }
}

export class Player {
    queue: track[]
    currenctTrack?: track
    connection: VoiceConnection
    guildID: string
    channelID: string
    paused: boolean = false
    volume: number = 100

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
    getCurrentTrack(): track | null {
        return this.currenctTrack || null
    }
    getPlayer(): VoiceConnection | null {
        return this.connection || null
    }
    getQueue(): track[] {
        return this.queue
    }
    addTrack(requester: track['requester'], track: { thumbnail: string, url: string, title: string }): track {
        const newTrack: track = {
            requester,
            music: { thumbnail: track.thumbnail, url: track.thumbnail, title: track.title, position: this.queue.length }
        }
        this.queue.push(newTrack)
        return newTrack
    }
    nextTrack() {
        
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
    loopTrack() {

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

    // -------------------------------------------- //
}