module.exports = {
    name: ':hammer: Moderation',
    id: 'mod',
    commands: require('fs')
        .readdirSync(`${__dirname}/commands/`)
        .map((file: string) => require(`${__dirname}/commands/${file}`)),
}
