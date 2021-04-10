module.exports = {
    name: ':notes: Music',
    id: 'music',
    commands: require('fs')
        .readdirSync(`${__dirname}/commands/`)
        .map((file: string) => require(`${__dirname}/commands/${file}`)),
}
