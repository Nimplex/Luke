const commands = require('fs')
  .readdirSync(`${__dirname}/commands/`)
  .map((file: string) => require(`${__dirname}/commands/${file}`))

export const data = {
	name: ':scroll: basic',
	id: 'basic',
  commands: commands,
}