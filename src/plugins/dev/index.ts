module.exports = {
    name: ':keyboard: Developer',
    id: 'dev',
    commands: require('fs')
        .readdirSync(`${__dirname}/commands/`)
        .map((file: string) => require(`${__dirname}/commands/${file}`)),
}
