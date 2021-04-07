import { Luke } from '@/index'
import { VoiceState } from 'discord.js'

module.exports = async (Luke: Luke, oldState: VoiceState, newState: VoiceState) => {
    if (oldState?.channelID !== newState?.channelID) {
        if (oldState.member?.id === Luke.user?.id) {
            // @ts-expect-error
            Luke.cache[oldState.guild.id] = undefined
        }
    }
}
