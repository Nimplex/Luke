const commands = require('fs')
  .readdirSync(`${__dirname}/commands/`)
  .map((file: string) => require(`${__dirname}/commands/${file}`))

export const data = {
	name: ':hammer: moderation',
	id: 'mod',
  commands: commands,
}