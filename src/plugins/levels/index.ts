module.exports = {
    name: ':bulb: Levels',
    id: 'levels',
    commands: require('fs')
        .readdirSync(`${__dirname}/commands/`)
        .map((file: string) => require(`${__dirname}/commands/${file}`)),
}
