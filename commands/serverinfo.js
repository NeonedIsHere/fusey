const { EmbedBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder, ActionRowBuilder, time } = require('discord.js')
const emoji = require('../emoji/utils/bot.json')

module.exports.run = async (client, message, args) => {
    const guild = message.guild
    const owner = guild.members.cache.get(guild.ownerId)

    const serverinfo = new EmbedBuilder()
        .setAuthor({ name: `serveinfo - ${guild.name}`, iconURL: client.user.displayAvatarURL() })
        .setTitle(`${emoji.info}・**__Informations__**`)
        .setColor('#EF8FB5')
        .setThumbnail(guild.iconURL({ dynamic: true }))
        .setImage(guild.bannerURL({ dynamic: true, size: 2048 }))
        .setFields(
            { name: 'Nom', value: `**\`${guild.name}\`**` },
            { name: 'ID', value: `**\`${guild.id}\`**` },
            { name: 'Description', value: `**\`${guild.description ? `${guild.description}` : "Aucun description fournie"}\`**` },
            { name: 'Date de création', value: `**<t:${parseInt(guild.createdTimestamp / 1000)}:f> (<t:${parseInt(guild.createdTimestamp / 1000)}:R>)**` },
            { name: 'Propriétaire', value: owner ? `**<@${guild.ownerId}> \`@${owner.user.username}\`**` : "**`Propriétaire non trouvé`**" },
            { name: 'Vanity URL', value: guild.vanityURLCode ? `**[.gg/${guild.vanityURLCode}](https://discord.com/invite/${guild.vanityURLCode})**` : "**\`Non définie\`**" }
        )
        .setTimestamp()
        .setFooter({ text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL() })

    const serverstats = new EmbedBuilder()
        .setAuthor({ name: `serveinfo - ${guild.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
        .setTitle(`${emoji.support}・**__Statistiques__**`)
        .setFields(
            { name: 'Membres', value: `**\`${guild.memberCount} au total\` \`(${guild.presences.cache.filter((presence) => presence.status !== 'offline').size} en ligne)\`**` },
            { name: 'Niveau de boost', value: `**\`Tiers ${guild.premiumTier}\` \`(${guild.premiumSubscriptionCount} boost)\`**` },
            { name: 'Nombre de salons', value: `**\`${guild.channels.cache.size} salons\`**` },
            { name: 'Nombre de rôles', value: `**\`${guild.roles.cache.size} rôles\`**`}
        )
        .setTimestamp()
        .setColor('#EF8FB5')
        .setFooter({ text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })

    const button1 = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel(`Icône`)
        .setURL(guild.iconURL({ dynamic: true, size: 2048 }) ? guild.iconURL({ dynamic: true, size: 2048 }) : "https://discord.com/invite/")
    const button2 = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel(`Bannière de serveur`)
        .setURL(guild.bannerURL({ dynamic: true, size: 2048 }) ? guild.bannerURL({ dynamic: true, size: 2048 }) : "https://discord.com/invite/")
    const button3 = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel('Bannière d\'invitation')
        .setURL(guild.splashURL({ dynamic: true, size: 2048 }) ? guild.splashURL({ dynamic: true, size: 2048 }) : "https://discord.com/invite/")

    const components = (state) => {
        return new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setPlaceholder('Choisissez une option')
                .setCustomId('serverinfo-menu')
                .setDisabled(state)
                .setOptions(
                    { label: 'Information', value: 'serverinfo', emoji: emoji.info },
                    { label: 'Statistique', value: 'serverstats', emoji: emoji.support }
                )
        )
    }

    const row = new ActionRowBuilder()
    if (guild.iconURL({ dynamic: true })) {
        row.addComponents(button1)
    }
    if (guild.bannerURL({ dynamic: true })) {
        row.addComponents(button2)
    }
    if (guild.splashURL({ dynamic: true })) {
        row.addComponents(button3)
    }

    const initialMessage = await message.reply({ embeds: [serverinfo], components: [components(false), row] })

    const filter = (interaction) => interaction.user.id === message.author.id

    const collector = message.channel.createMessageComponentCollector(
        {
            filter: filter,
            time: 900000
        }
    )

    collector.on('collect', (interaction) => {
        if (interaction.values[0] === 'serverinfo') {
            interaction.update({ embeds: [serverinfo], components: [components(false), row] }).catch((e) => { })
        } else if (interaction.values[0] === 'serverstats') {
            interaction.update({ embeds: [serverstats], components: [components(false), row] }).catch((e) => { })
        }
    })

    collector.on('end', (collected, reason) => {
        if (reason == 'time') {
            initialMessage.edit(
                { content: `L'interaction à expiré`, components: [components(true), row] }
            )
        }
    })
}
