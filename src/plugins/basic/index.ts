// https://github.com/badosz0/badosz-bot
const commands = require('fs')
  .readdirSync(`${__dirname}/commands/`)
  .map((file: string) => require(`${__dirname}/commands/${file}`))

export const data = {
	name: 'Basic',
	id: 'basic',
  commands: commands,
}