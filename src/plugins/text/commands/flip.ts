import { Command } from '../../../types'

const command: Command = {
    triggers: ['flip'],
    description: 'Flips your text.',
    usage: [
        {
            name: 'text',
            type: 'text',
            required: true
        }
    ],
    execute: async(message, Luke, ...args) => {
        const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~'
        const offset = '!'.charCodeAt(0)
        const text = args.join(' ').split('')
            .map(c => c.charCodeAt(0) - offset)
            .map(c => mapping[c] || ' ')
            .reverse().join('')
        Luke.embed({
            object: message,
            description: text
        })
    }
}

module.exports = command
