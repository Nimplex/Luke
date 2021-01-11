import Luke, { Command } from './../../../index'

export const data: Command['data'] = {
  triggers: ['serverinfo', 'server'],
  description: 'Shows informations about server.',
  botPermissions: ['MANAGE_GUILD', 'SEND_MESSAGES'],
  execute: async(message, ...args) => {
    const bots = message.guild?.members.cache.map(member => member.user.bot).length
    const members = message.guild?.memberCount
    return {
      title: `${message.guild?.name} (serverinfo).`,
      thumbnail: message.guild?.iconURL(),
      fields: [
        ['Name', message.guild?.name],
        ['Owner', message.guild?.owner?.user.tag],
        ['ID', message.guild?.id, false],
        ['Discord partner?', message.guild?.partnered ? 'yes' : 'no'],
        ['Large?', message.guild?.large ? 'yes' : 'no'],
        ['Region', message.guild?.region],
        ['Members', members],
        ['Bots', bots],
        ['Users', (members || 0) - (bots || 0)],
        ['Max. members', message.guild?.maximumMembers],
        ['Roles', message.guild?.roles.cache.size],
        ['Channels', message.guild?.channels.cache.size],
        ['Emojis', message.guild?.emojis.cache.size],
        ['Veryfication level', message.guild?.verificationLevel.toLocaleLowerCase().replace(/_/gm, ' ')],
        ['Guild creation', message.guild?.createdAt.toLocaleDateString()],
      ]
    }
  }
}