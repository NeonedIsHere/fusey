const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const config = require('../config.json')
const emoji = require('../emoji/utils/bot.json')

const permissions = {
    'Administrator' : 'Administrateur',
    'ViewAuditLog' : 'Voir les logs du serveur',
    'ViewGuildInsights' : 'Voir la vue d\'ensemble',
    'ManageGuild' : 'Gérer le serveur',
    'ManageRoles' : 'Gérer les rôles',
    'ManageChannels' : 'Gérer les salons',
    'KickMembers' : 'Kick des membres',
    'BanMembers' : 'Ban des membres',
    'CreateInstantinvite' : 'Créer des invitations',
    'ChangeNickname' : 'Changer de pseudo',
    'ManageNickname' : 'Gérer les pseudo',
    'ManageEmojiAndStickers' : 'Gérer  les emoji',
    'ManageWebhooks' : 'Gérer les webhooks',
    'ViewChannel' : 'Voir les salons',
    'SendMessage' : 'Envoyer des messages',
    'SendTTSMessage' : 'Envoyer des messages TTS',
    'ManageMessage' : 'Gérer les messages',
    'EmbedLinks' : 'Intégrer des liens',
    'AttachFiles' :'Joindre des fichiers',
    'ReadMessageHistory' : 'Voir l\'historique des messages',
    'MentionEveryone' : 'Mentionner @everyone, @here et tout les rôles',
    'UseExternalEmojis' : 'Utilisez des emojis externe',
    'AddReactions' : 'Ajoutez des réactions',
    'Connect' : 'Se connecter',
    'Speak' : 'Parler',
    'Streame' : 'Vidéo',
    'MuteMembers' : 'Mute des membres',
    'DeafenMembers' : 'Rendre sourd des membres',
    'MoveMembers' : 'Déplacer des membres',
    'UseVAD' : 'Utiliser l\'activité vocale',
    'PrioritySpeaker' : 'Voix prioritaire',
    'SendPolls' : 'Envoyer des sondages'
}

module.exports.run = async (client, message, args) => {

    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

    if (!role) {
        const flop = new EmbedBuilder()
            .setAuthor(
                { name: 'roleinfo', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.non} · **__Veuillez mentionner un rôle__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )
        return message.reply({ embeds: [flop] })
    }

    const rolePermssions = role.permissions.toArray()
    const finalPermissions = []
    
    for (const permission in permissions) {
        if (rolePermssions.includes(permission)) finalPermissions.push(`${permissions[permission]}`)
    }

    const roleinfo = new EmbedBuilder()
        .setAuthor(
            { name: `roleinfo - @${role.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle(`${emoji.membre} · **__Information sur le rôles__**`)
        .setFields(
            { name: 'Nom', value: `** ${role} \`@${role.name}\`**`, inline: true },
            { name: 'ID', value: `**\`${role.id}\`**`, inline: true },
            { name: 'Date de création', value: `**<t:${parseInt(role.createdAt / 1000)}:f> (<t:${parseInt(role.createdAt / 1000)}:R>)**`, inline: true },
            { name: 'Couleur', value: `**\`${role.color}\`**`, inline: true },
            { name: 'Position', value: `**\`${role.position}/${message.guild.roles.cache.size}\`**`, inline: true },
            { name: 'Affiché séparement', value: role.hoist ? `**${emoji.oui} \`Oui\`**` : `**${emoji.non} \`Non\`**`, inline: true },
            { name: 'Mentionnable', value: role.mentionable ? `**${emoji.oui} \`Oui\`**` : `**${emoji.non} \`Non\`**`, inline: true }
        )
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
        )

    const AdRoleInfo = new EmbedBuilder()
        .setAuthor(
            { name: `roleinfo - @${role.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle(`${emoji.config}・**__Information avancer__**`)
        .setFields(
            { name: 'Administrateur', value: role.permissions.toArray().includes('Administrator') ? `**${emoji.oui} \`Oui\`**` : `**${emoji.non} \`Non\`**`, inline: true },
            { name: 'Membre ayant ce rôle', value: `**\`${role.members.size || "0"}\`**`, inline: true },
            { name: 'Rôles d\'intégration', value: role.managed ? `**${emoji.oui} \`Oui\`**` : `**${emoji.non} \`Non\`**`, inline: true },
            { name: 'Rôles booster', value: role.managed ? `**${emoji.oui}\`Oui\`` : `${emoji.non} **\`Non\`**`,inline: true },
            { name: 'Permission', value: finalPermissions.length !== 0 ? `**\`\`\`yaml\n${finalPermissions.join(', \n')}\`\`\`**` : `Aucune`, inline: false }
        )
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
        )

    const selct = (state) => [
        new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setPlaceholder('Sélectionner une page')
                .setCustomId('roleinfo-menu')
                .setDisabled(state)
                .setOptions(
                    { label: 'Informations sur le rôles', value: 'roleinfo', emoji: emoji.membre},
                    { label: 'Informations avancer', value: 'AdRoleInfo', emoji: emoji.config }
                )
        )
    ]

    const initialMessage = await message.reply({ embeds: [roleinfo], components: selct(false) })

    const filter = (interaction) => interaction.user.id === message.author.id

    const collector = message.channel.createMessageComponentCollector(
        { filter: filter, time: 300000 }
    )

    collector.on('collect', (interaction) => {
        if (interaction.values[0] === 'roleinfo') {
            interaction.update({ embeds: [roleinfo], components: selct(false) }).catch((e) => {})
        } else if (interaction.values[0] === 'AdRoleInfo') {
            interaction.update({ embeds: [AdRoleInfo], components: selct(false) }).catch((e) => {})
        }
    })

    collector.on('end', (collected, reason) => {
        if (reason == 'time') {
            initialMessage.edit(
                { content: "L'interaction a expiré", components: selct(true) }
            )
        }
    })

}