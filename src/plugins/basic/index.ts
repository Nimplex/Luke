module.exports = {
    name: ':scroll: basic',
    id: 'basic',
    commands: require('fs')
        .readdirSync(`${__dirname}/commands/`)
        .map((file: string) => require(`${__dirname}/commands/${file}`))
}