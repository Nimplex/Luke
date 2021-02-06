import Luke, { Command } from './../../../index'

export const data: Command['data'] = {
  triggers: ['userinfo', 'user'],
  description: 'Shows informations about user.',
  usage: '[@user|id]',
  botPermissions: ['SEND_MESSAGES'],
  execute: async(message, ...args) => {
    const user = message.mentions.members?.first()?.user || message.guild?.members.cache.get(args[0])?.user || message.author
    const member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0]) || message.member
    const avatar = await user.avatarURL({ dynamic: true })?.toString()

    return {
      title: `${user.tag} (click for avatar).`,
      thumbnail: avatar,
      fields: [
        ['Username', user.tag, true],
        ['Status', user.presence.status, true],
        ['Client',
        user.presence.clientStatus?.desktop ? 'Desktop' : undefined ||
        user.presence.clientStatus?.web ? 'Web' : undefined ||
        user.presence.clientStatus?.mobile ? 'Mobile' : undefined,
        true
        ],
        ['Bannable?', member?.bannable ? 'yes' : 'no', true],
        ['Kickable?', member?.kickable ? 'yes' : 'no', true],
        ['Bot?', user.bot ? 'yes' : 'no', true],
        ['Nickname', member?.nickname, true],
        ['Administrator?', member?.permissions.has('ADMINISTRATOR') ? 'yes' : 'no', true],
        ['Boosted?', member?.premiumSince ? 'yes' : 'no', true],
        ['Joined', `${member?.joinedAt?.toLocaleTimeString()}, ${member?.joinedAt?.toLocaleDateString()}`, true],
        ['Created', `${user?.createdAt?.toLocaleTimeString()}, ${user?.createdAt?.toLocaleDateString()}`, true],
        ['ID', user.id],
        ['Avatar URL', avatar]
      ],
      url: avatar
    }
  }
}