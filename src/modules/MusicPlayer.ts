export type track = {
    requester: {
        id: string
        username: string
    }
    music: {
        url: string
        thumbnail: string
        position: number
    }
}

export class Player {
    queue: track[]
    currenctTrack?: track
    guildID: string
    channelID: string

    constructor(guildID: string, channelID: string) {
        this.queue = []
        this.guildID = guildID
        this.channelID = channelID
    }

    // -------------------------------------------- //
    
    getTrack(position: number) {

    }
    getCurrentTrack() {

    }
    getPlayer() {

    }
    getQueue() {
    
    }
    nextTrack() {

    }
    removeTrack(position: number) {

    }
    loopTrack() {

    }

    // -------------------------------------------- //

    setVolume(volume: number) {

    }
    pausePlayer() {

    }
    resumePlayer() {

    }

    // -------------------------------------------- //
}