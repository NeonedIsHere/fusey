const { PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, time, Embed, ChannelType, RouteBases, ComponentType, VoiceChannel } = require('discord.js')
const config = require('../config.json')
const emoji = require('../emoji.json')

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageMessages) || !message.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: 'clearuser - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.bot.non}・**__Vous n'avez pas les permsissions nécessaire pour effectuer la commande__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setFields(
                { name: 'Permission(s) manquante', value: `\`\`\`yaml\n- Gérer les message\n- Rendre muet les membres\`\`\`` }
            )
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        const flopButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji(emoji.bot.support)
                .setLabel('support')
                .setStyle(ButtonStyle.Link)
                .setURL(config.support)
            )

        return message.reply(
            { embeds: [flop], components: [flopButton] }
        )
    } else {

        if (!args[0]) {

            const flop = new EmbedBuilder()
                .setAuthor(
                    { name: `clearuser - error`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setTitle(`${emoji.bot.non}・**__Vous devez mentionner un utilisateur__**`)
                .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                )

            const flopButton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setEmoji(emoji.bot.support)
                    .setLabel('support')
                    .setStyle(ButtonStyle.Link)
                    .setURL(config.support)
                )

            return message.reply(
                { embeds: [flop], components: [flopButton] }
            )

        }

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || await client.users.fetch(args[0]).catch(() => {})

        if (!user) {
            
            const flop = new EmbedBuilder()
                .setAuthor(
                    { name: 'clearuser - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setTitle(`${emoji.bot.non}・**__Cet utilisateur n'existe pas__**`)
                .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                )

            const flopButton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setEmoji(emoji.bot.support)
                    .setLabel('support')
                    .setStyle(ButtonStyle.Link)
                    .setURL(config.support)
                )

            return message.reply(
                { embeds: [flop], components: [flopButton] }
            )
        }

        if (user.id === message.author.id) {
            
            const flop = new EmbedBuilder()
                .setAuthor(
                    { name: 'clearuser - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setTitle(`${emoji.bot.non}・**__Vous ne pouvez pas supprimez vos propre message__**`)
                .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                )

            const flopButton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setEmoji(emoji.bot.support)
                    .setLabel('support')
                    .setStyle(ButtonStyle.Link)
                    .setURL(config.support)
                )

            return message.reply(
                { embeds: [flop], components: [flopButton] }
            )

        }

        const question = new EmbedBuilder()
            .setAuthor(
                { name: `clearuser - ${user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.bot.question}・**__Voulez vous supprimer tout les messages de ${user.username} sur le serveur ?__**`)
            .setDescription("Merci de confirmer votre choix avec les boutons si dessous avant de continuer")
            .setColor('#ffb000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        const yesButton = new ButtonBuilder()
            .setCustomId('confirm_button')
            .setEmoji(emoji.bot.oui)
            .setStyle(ButtonStyle.Success)
            .setDisabled(false)
            .setLabel('Confirmer')

        const Button = new ButtonBuilder()
            .setStyle(ButtonStyle.Secondary)
            .setLabel('ㅤ')
            .setDisabled(true)
            .setCustomId('button')

        const noButton = new ButtonBuilder()
            .setCustomId('cancel_button')
            .setEmoji(emoji.bot.non)
            .setStyle(ButtonStyle.Danger)
            .setDisabled(false)
            .setLabel('Annuler')

        const row = new ActionRowBuilder()
            .addComponents(yesButton, Button, noButton)

        const msg = await message.reply({ embeds: [question], components: [row] })
            const filter = interaction => interaction.user.id === message.author.id
            const collector = message.channel.createMessageComponentCollector(
                { filter: filter, time: 10000 }
            )

            collector.on('collect', async (interaction) => {
                if (interaction.customId === 'confirm_button') {
                    msg.components.forEach((row) => {
                        row.components.forEach((component) => {
                            component.data.disabled = true
                        })
                    })
                    await interaction.update({ components: msg.components })

                    const progress = new EmbedBuilder()
                        .setAuthor(
                            { name: `clearuser - ${user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true}) }
                        )
                        .setTitle(`${emoji.bot.info}・**__Suppression des message en cours__**...`)
                        .setDescription(`Merci de patienter quelques instant, les messages de ${user} seront bientôt tous supprimer`)
                        .setColor('#00ABFF')
                        .setTimestamp()
                        .setFooter(
                            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                        )
                        await interaction.channel.send({ embeds: [progress] })

                        const channels = message.guild.channels.cache
                        if (!channels) return

                        await channels.forEach(async channelo => {
                            const channel = message.guild.channels.cache.get(channelo.id)
                            if (channel.type !== ChannelType.GuildText) return

                            const msgFetch = await channel.messages.fetch(
                                { limit: 100, before: message.id }
                            )
                            if (!msgFetch) return

                            const userMessage = msgFetch.filter(msg => msg.author.id === user.id)
                            await channel.bulkDelete(userMessage, true)

                        })

                        const Success = new EmbedBuilder()
                            .setAuthor(
                                { name: `clearuser - ${user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                            )
                            .setTitle(`${emoji.bot.oui}・**__Suppression des message de ${user.username} effectuée avec succès__**`)
                            .setDescription(`Tout les message de ${user} on été correcter supprimer du serveur`)
                            .setColor('#00ff00')
                            .setTimestamp()
                            .setFooter(
                                { text: `Demande par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                            )

                        await message.channel.send({ embeds: [Success] })

                } else if (interaction.customId === 'cancel_button') {
                    msg.components.forEach(row => {
                        row.components.forEach((component) => {
                            component.data.disabled = true
                        })
                    })

                    const cancel = new EmbedBuilder()
                    .setAuthor(
                        { name: 'clearuser - annuler', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                    )
                    .setTitle(`${emoji.bot.non}・**__Suppression des messages annuler__**`)
                    .setDescription(`Les messages de ${user} ne seront pas supprimés`)
                    .setColor('#FF0000')
                    .setTimestamp()
                    .setFooter(
                        { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}
                    )

                    await interaction.update({ embeds: [cancel], components: msg.components })

                }
            })

    }
}