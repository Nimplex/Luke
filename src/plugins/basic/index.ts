const commands = require('fs')
    .readdirSync(`${__dirname}/commands/`)
    .map((file: string) => require(`${__dirname}/commands/${file}`))

module.exports = {
	name: ':scroll: basic',
	id: 'basic',
    commands: commands,
}