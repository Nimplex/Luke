import Luke, { Command } from './../../../index'

export const data: Command['data'] = {
  triggers: ['serverinfo', 'server'],
  description: 'Shows informations about server.',
  botPermissions: ['MANAGE_GUILD', 'SEND_MESSAGES'],
  execute: async(message, ...args) => {
    const bots = message.guild?.members.cache.map(member => member.user.bot).length
    const members = message.guild?.memberCount
    const { guild } = message
    return {
      title: `${guild?.name} (serverinfo).`,
      thumbnail: message.guild?.iconURL(),
      fields: [
        ['Name', guild?.name, true],
        ['Owner', guild?.owner?.user.tag, true],
        ['ID', guild?.id],
        ['Deleted?', guild?.deleted ? 'yes' : 'no', true],
        ['Avaible?', guild?.available ? 'yes' : 'no', true],
        ['Partner?', guild?.partnered ? 'yes' : 'no', true],
        ['Description', guild?.description],
        ['Creation date', guild?.createdAt.toLocaleDateString()],
        ['Boosts', guild?.premiumSubscriptionCount?.toString(), true],
        ['Boost level', guild?.premiumTier.toString(), true],
        ['Veryfication level', guild?.verificationLevel.toLocaleLowerCase().replace(/_/gm, ' ')],
        ['Roles', guild?.roles.cache.size, true],
        ['Channels', guild?.channels.cache.size, true],
        ['Emojis', guild?.emojis.cache.size, true],
        ['Members', members, true],
        ['Bots', bots, true],
        ['Users', (members || 0) - (bots || 0), true],
        ['Icon URL', guild?.iconURL()]
      ]
    }
  }
}