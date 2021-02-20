module.exports = {
    name: ':smile: Fun',
    id: 'fun',
    commands: require('fs')
        .readdirSync(`${__dirname}/commands/`)
        .map((file: string) => require(`${__dirname}/commands/${file}`))
}