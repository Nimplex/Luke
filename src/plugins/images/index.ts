// https://github.com/badosz0/badosz-bot/tree/master/src/plugins/images

import { Command } from '@/types'
import { makeRequest } from '../../modules/Obrazium'

const commands: Command[] = []
const images = [
    'ant',
    'bird',
    'bee',
    'rabbit',
    'catgirl',
    'cuddle',
    'dog',
    'feed',
    'fox',
    'hug',
    'jesus',
    'kiss',
    'pat',
    'poke',
    'shibe',
    'snake',
    'pig',
    'koala',
    'gecko',
    'tickle',
]

for (const image of images) {
    const command: Command = {
        triggers: [image],
        description: `Get image of ${image}.`,
        execute: async (message, Luke, ...args) => {
            Luke.embed({
                object: message,
                attachment: await (await makeRequest(image)).buffer(),
                footer: 'Image from https://obrazium.com',
            })
        },
    }
    commands.push(command)
}

module.exports = {
    name: ':frame_photo: Images',
    id: 'images',
    commands: commands,
}
