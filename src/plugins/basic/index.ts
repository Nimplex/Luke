module.exports = {
    name: ':abcd: Basic',
    id: 'basic',
    commands: require('fs')
        .readdirSync(`${__dirname}/commands/`)
        .map((file: string) => require(`${__dirname}/commands/${file}`))
}