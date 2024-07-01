const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SKUFlags, Embed } = require('discord.js')
const config = require('../config.json')
const emoji = require('../emoji/utils/bot.json')

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: "unbanall - error", iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.non}・**__Vous n'avez pas la permissions d'utiliser cette commande__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setFields(
                { name: 'Permission(s) manquante', value: `\`\`\`yaml\nAdministrateur\`\`\``}
            )
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        const flopButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji(emoji.support)
                    .setLabel('Support')
                    .setStyle(ButtonStyle.Link)
                    .setURL(config.support)
            )

        return message.reply({ embeds: [flop], components: [flopButton] })

    }

    const ban = await message.guild.bans.fetch()

    if (ban.size > 0) {

        const caca = new EmbedBuilder()
            .setAuthor(
                { name: `unbanall`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.non}・**__Aucun utilisateur bannis__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        const cacaButton = new ButtonBuilder()
            .setEmoji(emoji.support)
            .setLabel('Support')
            .setStyle(ButtonStyle.Link)
            .setURL(config.support)

        return message.reply({ embeds: [caca], components: [cacaButton] })

    }

    const question = new EmbedBuilder()
        .setAuthor(
            { name: 'unbanall', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle(`${emoji.question}・**__Êtes-vous sur de vouloir révoquer tout les bannissements du serveur__**?`)
        .setDescription(`EN acceptant, un total de **\`${ban.size} utilisateur\`** seront débannis et pourrons de nouveaux rejoindre le serveur.`)
        .setColor('#FFB000')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
        )

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('oui')
                .setEmoji(emoji.oui)
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId('non')
                .setEmoji(emoji.non)
                .setStyle(ButtonStyle.Danger)
        )

    const msg = await message.reply({ embeds: [question], components: [row] })
    const collector = msg.createMessageComponentCollector({})

    collector.on('collect', async (interaction) => {

        if (interaction.customId == 'oui') {
            
            msg.components.forEach((row) => {
                row.components.forEach((component) => {
                    component.data.disabled = true
                })
            })

            await interaction.update({ components: msg.components })

            const pending = new EmbedBuilder()
                .setAuthor(
                    { name: `unbanall`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setTitle(`${emoji.info}・**__Révocation de tout les bannissement en cours__**...`)
                .setDescription(`Un total de **\`${ban.size} bannissements\`** sont entrain d'être révoquer, merci de patientez`)
                .setColor('#00abff')
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                )

            await message.channel.send({ embeds: [pending] })

            await ban.forEach(async (user) => {

                await message.guild.bans.remove(user.user.id)

            })

            const okay = new EmbedBuilder()
                .setAuthor(
                    { name: `unbanall`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setTitle(`${emoji.oui}・**__Tout les bannissements on été révoquer__**`)
                .setDescription(`Un total de \`${ban.size} bannissement\` on été révoquer et les utilisateur peuvent désormer rejoindre le serveur.`)
                .setColor('#00FF00')
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                )

            await message.channel.send({ embeds: [okay] })

        } else if (interaction.customId === 'non') {
            
            const no = new EmbedBuilder()
                .setAuthor(
                    { name: 'unbanall', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setTitle(`${emoji.non}・**__Révoquation de tout les bannissments__**`)
                .setDescription('Aucun bannissement ne sera révoquer suite a l\'annulation de la commande.')
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                )

            msg.components.forEach((row) => {
                row.components.forEach((component) => {
                    component.data.disabled = true
                })
            })

            await interaction.update({ components: msg.components })

            return message.channel.send({ embeds: [no] })

        }

    })

}