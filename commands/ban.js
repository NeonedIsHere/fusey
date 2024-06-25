const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, ButtonBuilder, PermissionFlagsBits } = require('discord.js')
const config = require('../config.json')
const emoji = require('../emoji/utils/bot.json')

module.exports.run = async (client, message, args) => {

    const member = message.mentions.members.first()

    const embed = new EmbedBuilder()
       .setAuthor(
        { name: 'ban', iconURL: client.user.displayAvatarURL() }
       )
       .setTitle(`Bannissement`)
       .setDescription(`${member} à été correctement banni.`)
       .setFields(
            { name: 'Utilisateur', value: `${member}` },
            { name: 'Modérateur', value: `${message.author}` }
        )
        .setColor('Random')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL() }
        )

    const embed2 = new EmbedBuilder()
        .setAuthor(
            { name: 'ban', iconURL: client.user.displayAvatarURL() }
        )
       .setTitle(`${emoji.non} ∙ **__Erreur__**`)
       .setDescription(`Impossible de bannir ${member} pour la raison suivante : Vous ne possedez pas la permission \`Bannir des membre\``)
       .setColor('Random')
       .setTimestamp()
       .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL() }
        )

    const embed3 = new EmbedBuilder()
        .setAuthor(
            { name: 'ban', iconURL: client.user.displayAvatarURL() }
        )
        .setTitle(`${emoji.non} ∙ **__Erreur__**`)
        .setDescription(`Impossible de bannir ${member} pour la raison suivante : \`Vous n'avez pas mentionner de membre valide\``)
        .setColor('Random')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL() }
        )
    
    const embed4 = new EmbedBuilder()
       .setAuthor(
            { name: 'ban', iconURL: client.user.displayAvatarURL() }
        )
       .setTitle(`${emoji.non} ∙ **__Erreur__**`)
       .setDescription(`Impossible de bannir ${member} pour la raison suivante : \`Vous ne pouvez pas bannir un membre ayant un rôle supperieur ou égal a vous.\``)
       .setColor('Random')
       .setTimestamp()
       .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL() }
        )

    const embed5 = new EmbedBuilder()
        .setAuthor(
            { name: 'ban', iconURL: client.user.displayAvatarURL() }
        )
        .setTitle(`${emoji.non} ∙ **__Erreur__**`)
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

    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
        return message.reply({ embeds: [embed2] })
    }

    const userToBan = message.mentions.members.first()
    if (!userToBan) {
        return message.reply({ embeds: [embed3] })
    }

    if (userToBan.roles.highest.position >= message.member.roles.highest.position) {
        return message.reply({ embeds: [embed4] })
    }


    try {
        await member.ban({ reason: `A été banni par ${message.author.username}`})
        message.channel.send({ embeds: [embed] })
    } catch (error) {
        console.error(error)
        message.reply({ embeds: [embed5], components: [support] })
    }
       
}