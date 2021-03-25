module.exports = {
  name: ':scroll: Text',
  id: 'text',
  commands: require('fs')
      .readdirSync(`${__dirname}/commands/`)
      .map((file: string) => require(`${__dirname}/commands/${file}`))
}