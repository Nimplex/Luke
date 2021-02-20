import { Command } from '../../../types'

const command: Command = {
    triggers: ['8ball', '8b'],
    description: 'Asks 8ball a question.',
    usage: [
        {
            name: 'question',
            type: 'text',
            required: true
        }
    ],
    execute: async(message, Luke, ...args) => {
        const answers = [
            'It\'s decidedly so',
            'Yes definitely',
            'As I see it, yes',
            'Most likely',
            'Outlook good',
            'Yes',
            'Ask again later',
            'Better not tell you now',
            'Cannot predict now',
            'Concentrate and ask again',
            'Don\'t count on it',
            'My reply is no',
            'My sources say no',
            'Outlook not so good',
            'Very doubtful',
            'No'
        ]
        Luke.embed({
            object: message,
            description: answers[Math.floor(Math.random() * answers.length)]
        })
    }
}

module.exports = command