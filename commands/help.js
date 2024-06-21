const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../config.json');
const emoji = require("../emoji.json")

module.exports.run = async (client, message, args) => {

    const embed = new EmbedBuilder()
        .setAuthor(
            { name: `Mon prefixe est ${config.prefix}`, iconURL: client.user.displayAvatarURL() }
        )
        .setTitle(`Voici les command de ${client.user.username}`)
        .setColor('#EF8FB5')
        .setDescription('**Sélectionne la catégorie de commande que tu veux**\n```yaml\n∙ Autre ➜ 3\n∙ Information ➜ 4\n∙ Modération ➜ 1\n```')
        .addFields(
            { name: 'Liens', value: `- [Serveur Support](${config.support})`, inline: true },
        )
        .setTimestamp()
        .setFooter({
            text: `Demander par ${message.author.username}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
        });

    const autre = new EmbedBuilder()
        .setAuthor(
            { name: `Mon prefixe est ${config.support}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle('Catégorie ➜ Autre')
        .setDescription("```yaml\nVoici les commandes autre :```")
        .setFields(
            { name: `${config.prefix}help`, value: 'Permet d\'afficher un menu intéractif pour avoir la liste des commande sur le bot.', inline: true },
            { name: `${config.prefix}invite`, value: 'Permet d\'afficher le lien d\'invitation du bot et du serveur support.', inline: true },
            { name: `${config.prefix}ping`, value:  'Permet d\'afficher la latence du bot et de l\'API de discord.', inline: true },
        )
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
        )

    const info = new EmbedBuilder()
        .setAuthor(
            { name: `Mon prefixe est ${config.prefix}`, iconURL: client.user.displayAvatarURL() }
        )
        .setTitle("Catégorie ➜ Information")
        .setColor('#EF8FB5')
        .setDescription("```yaml\nVoici les commandes information :```")
        .addFields(
            { name: `${config.prefix}botinfo`, value: 'Permet d\'afficher des information sur le bot', inline: true },
            { name: `${config.prefix}channelinfo`, value: 'Permet d\'afficher des information sur un salon', inline: true },
            { name: `${config.prefix}serverinfo`, value: 'Permet d\'afficher des informations sur le serveur', inline: true },
            { name: `${config.prefix}userinfo`, value: 'Permet d\'afficher des informations sur un membre', inline: true}
        )
        .setTimestamp()
        .setFooter({
            text: `Demander par ${message.author.username}`,
            iconURL: message.author.displayAvatarURL({ dynamic: true })
        })

    const mod = new EmbedBuilder()
    .setAuthor(
        { name: `Mon prefixe est ${config.prefix}`, iconURL: client.user.displayAvatarURL() }
    )
    .setTitle("Catégorie ➜ Modération")
    .setColor('#EF8FB5')
    .setDescription("```yaml\nVoici les commandes de modération:```")
    .setFields(
        { name: `${config.prefix}ban`, value: 'Permet de bannir un membre', inline: true }
    )
    .setTimestamp()
    .setFooter({
        text: `Demander par ${message.author.username}`,
        iconURL: message.author.displayAvatarURL()
    });

    const components = (state) => [
        new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
            .setCustomId("help-menu")
            .setPlaceholder("Sélectionne une catégorie")
            .setDisabled(state)
            .addOptions(
                { label: "Autre", value: 'autre', description: "Voir les commande autre.", emoji: emoji.bot.general },
                { label: "Information", value: "info", description: "Voir les commandes information.", emoji: emoji.bot.info },
                { label: "Modération", value: "mod", description: "Voir les commandes modération.", emoji: emoji.bot.mod },
            )
        ),
        new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('home')
                .setStyle(ButtonStyle.Primary)
                .setLabel('Accueil')
                .setEmoji(emoji.bot.home)
                .setDisabled(state),
            new ButtonBuilder()
                .setURL(config.support)
                .setLabel('Serveur support')
                .setStyle(ButtonStyle.Link)
                .setEmoji(emoji.bot.support)
        )
    ];

    const initialMessage = await message.reply({ embeds: [embed], components: components(false) });

    const filter = (interaction) => interaction.user.id === message.author.id

    const collector = message.channel.createMessageComponentCollector(
        {
            filter: filter,
            time: 300000
        }
    )

    collector.on('collect', (interaction) => {
        if (interaction.customId === "home") {
            interaction.update({ embeds: [embed], components: components(false) }).catch((e) => {});
        } else if (interaction.values[0] === "autre") {
            interaction.update({ embeds: [autre], components: components(false) }).catch((e) => {});
        } else if (interaction.values[0] === "info") {
            interaction.update({ embeds: [info], components: components(false) }).catch((e) => {});
        } else if (interaction.values[0] === "mod") {
            interaction.update({ embeds: [mod], components: components(false) }).catch((e) => {});
        }
    });
    collector.on("end", (collected, reason) => {
        if (reason == "time") {
            initialMessage.edit({
                content: "L'interaction à expiré.",
                components: components(true)
            })
        }
    });
};