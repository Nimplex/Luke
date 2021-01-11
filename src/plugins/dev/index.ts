const commands = require('fs')
  .readdirSync(`${__dirname}/commands/`)
  .map((file: string) => require(`${__dirname}/commands/${file}`))

export const data = {
	name: ':computer: developer',
  id: 'dev',
  hide: true,
  commands: commands,
}