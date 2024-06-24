const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const config = require('../config.json')
const emoji = require('../emoji.json')

module.exports.run = async (client, message, args) => {
    const member = message.mentions.members.first()

    const embed = new EmbedBuilder()
       .setAuthor(
        { name: 'mute', iconURL: client.user.displayAvatarURL() }
       )
       .setTitle(`Mute`)
       .setDescription(`${member} à été correctement mute.`)
       .setFields(
            { name: 'Utilisateur', value: `${member}` },
            { name: 'Modérateur', value: `${message.author}` },
            { name: 'Raison', value: `\`${reason}\`` }
        )
        .setColor('Random')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL() }
        )

    const embed2 = new EmbedBuilder()
        .setAuthor(
            { name: 'mute', iconURL: client.user.displayAvatarURL() }
        )
       .setTitle(`${emoji.bot.non} ∙ **__Erreur__**`)
       .setDescription(`Impossible de mute ${member} pour la raison suivante : Vous ne possedez pas la permission \`Bannir des membre\``)
       .setColor('Random')
       .setTimestamp()
       .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL() }
        )

    const embed3 = new EmbedBuilder()
        .setAuthor(
            { name: 'mute', iconURL: client.user.displayAvatarURL() }
        )
        .setTitle(`${emoji.bot.non} ∙ **__Erreur__**`)
        .setDescription(`Impossible de mute ${member} pour la raison suivante : \`Vous n'avez pas mentionner de membre valide\``)
        .setColor('Random')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL() }
        )
    
    const embed4 = new EmbedBuilder()
       .setAuthor(
            { name: 'mute', iconURL: client.user.displayAvatarURL() }
        )
       .setTitle(`${emoji.bot.non} ∙ **__Erreur__**`)
       .setDescription(`Impossible de mute ${member} pour la raison suivante : \`Vous ne pouvez pas bannir un membre ayant un rôle supperieur ou égal a vous.\``)
       .setColor('Random')
       .setTimestamp()
       .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL() }
        )

    const embed5 = new EmbedBuilder()
        .setAuthor(
            { name: 'mute', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle(`${emoji.bot.non} ∙ **__Erreur__**`)
        .setDescription(`Impossible de mute ${member} pour la raison suivante : \`Vous n'avez pas séléction de durée valide\``)
        .setColor('Random')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
        )
        
    const embed6 = new EmbedBuilder()
        .setAuthor(
            { name: 'mute', iconURL: client.user.displayAvatarURL() }
        )
        .setTitle(`${emoji.bot.non} ∙ **__Erreur__**`)
        .setDescription(`Une erreur est survenue lors de la tentative de bannissement de ${member}, merci réessayer. Si l'erreur persiste, merci de nous le signaler sur le support que vous pouvez rejoindre en cliquant [ici](${config.support}) ou en cliquant sur le bouton ci-dessous.`)
        .setColor('Random')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL() }
        )

    const support = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setLabel('Rejoindre le support')
            .setStyle('Link')
            .setEmoji(emoji.support)
            .setURL(config.support)
        )

    const user = message.mentions.members.first();
    const time = parseInt(args[1])
    const reason = args.slice(2).join('') || 'Aucune raison spécifier.'

    if (!message.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
        return message.reply()
    }

    if (!user) {
        
    }
}