module.exports = {
    name: ':anchor: Utility',
    id: 'utility',
    commands: require('fs')
        .readdirSync(`${__dirname}/commands/`)
        .map((file: string) => require(`${__dirname}/commands/${file}`))
}
