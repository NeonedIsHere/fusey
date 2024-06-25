const Discord = require('discord.js')
const emoji = require('../emoji/utils/bot.json')

module.exports.run = async (client, message, args) => {

    const channelType = {
        0: "Salon Textuel",
        1: "Message Privé",
        2: "Salon Vocaux",
        3: "Groupe Message Privé",
        4: "Catégorie",
        5: "Salon d'annonce",
        10: "Fils de nouveauté",
        11: "Fils Publique",
        12: "Fils Privé",
        13: "Stage",
        14: "GuildDirectory",
        15: "Forum",
        16: "Média"
    }

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel

    function time(timeString) {
        if (timeString < 60 ) {
            return timeString + " seconde"
        } else if (timeString < 3600) {
            const minutes = Math.floor(timeString / 60)
            return minutes + " minutes"
        } else if (timeString < 86400) {
            const heures = Math.floor(timeString / 3600)
            return heures + " heures"
        } else {
            const jour = Math.floor(timeString / 86400)
            return jour + " jours"
        }
    }

    const general = new Discord.EmbedBuilder()
        .setAuthor(
            { name: 'channelinfo', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle(`${emoji.general}・**__Informations géneral__**`)
        .setFields(
            { name: 'Nom', value: `**${channel} \`${channel.name}\`**`},
            { name: 'ID', value: `**\`${channel.id}\`**`},
            { name: 'Sujet', value: `**\`${channel.topic || 'Aucun'}\`**`},
            { name: 'Date de création', value: `**<t:${parseInt(channel.createdTimestamp / 1000)}:R> (<t:${parseInt(channel.createdTimestamp / 1000)}:f>)**`},
            { name: 'Type', value: `**\`${channelType[parseInt(channel.type)]}\`**`},
            { name: 'Catégorie', value: `**${channel.parent.name || "Aucune"}**`}
        )
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
        )

    const tech = new Discord.EmbedBuilder()
        .setTitle(`${emoji.config}・**__Informations avancé__**`)
        .setFields(
            { name: 'Mode lent', value: `**\`${parseInt(channel.rateLimitPerUser) !== 0 ? time(parseInt(channel.rateLimitPerUser)) : "Désactiver"}\`**`},
            { name: 'NSFW', value: `**\`${channel.nsfw ? "Oui" : 'Non'}\`**` }
        )
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}
        )

    const components = (state) => [
        new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
           .setCustomId("channelinfo-menu")
           .setPlaceholder('Choisissez une option')
           .setDisabled(state)
           .addOptions(
                { label: 'Général', value: 'general', emoji: emoji.general, description: 'Affiche les informations général du salon' },
                { label: 'Technique', value: 'tech', emoji: emoji.config, description: 'Affiche les informations technique du salon'  }
            )
        )
    ]

    const initialMessage = await message.reply({ embeds: [general], components: components(false) })

    const filter = (interaction) => interaction.user.id === message.author.id

    const collector = message.channel.createMessageComponentCollector(
        { filter: filter, time: 900000 }
    )

    collector.on('collect', (interaction) => {
        if (interaction.values[0] === 'general') {
            interaction.update({ embeds: [general], components: components(false) }).catch((e) => {})
        } else if (interaction.values[0] === 'tech') {
            interaction.update({ embeds: [tech], components: components(false) }).catch((e) => {})
        } 
    })

    collector.on('end', (collected, reason) => {
        if (reason == 'time') {
            initialMessage.edit(
                { content: 'L\'interaction à expiré.', components: components(true) }
            )
        }
    })
}