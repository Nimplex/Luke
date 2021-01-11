const commands = require('fs')
  .readdirSync(`${__dirname}/commands/`)
  .map((file: string) => require(`${__dirname}/commands/${file}`))

export const data = {
	name: ':information_source: Info',
	id: 'info',
  commands: commands,
}