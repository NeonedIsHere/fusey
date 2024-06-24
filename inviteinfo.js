const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js')
const config = require('../config.json')
const emoji = require('../emoji.json')

module.exports.run = async (client, message, args) => {

    const channelType = {
        0: "Salon Textuel",
        1: "Message Privé",
        2: "Salon Vocal",
        3: "Groupe Message Privé", 
        5: "Catégorie",
        5: "Salon d'annonce",
        10: "Fils de nouveauté",
        11: "Fils Publique",
        12: "Fils Privé",
        13: "Stage",
        14: "GuildDirectory",
        15: "Forum",
        16: "Média"
    }

        const embed = new EmbedBuilder()
            .setAuthor(
                { name: 'inviteinfo', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setColor('#ff0000')
            .setTitle(`${emoji.bot.non} · __Vous devez envoyer une invitation__**`)
            .setDescription(`Vous devez envoyer une invitation. En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            );

        const no = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji(emoji.bot.support)
                .setLabel('Support')
                .setStyle(ButtonStyle.Link)
                .setURL(config.support)
        )
        if (!args[0]) return message.reply(
            { embeds: [embed], components: [no] }
        )

        try {
            
            const invite = await client.fetchInvite(args[0])
            const guild = invite.guild
            
            const ServerInvInfo = new EmbedBuilder()
                .setAuthor(
                    { name: `inviteinfo - ${invite}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setTitle(`${emoji.bot.home} · Information sur le serveur`)
                .setFields(
                    { name: 'Nom', value: `**\`${guild.name}\`**`, inline: true },
                    { name: 'ID', value: `**\`${guild.id}\`**`, inline: true },
                    { name: 'Description', value: guild.description ? `**\`${guild.description}\`**` : '**`Aucune`**'},
                    { name: 'Date de création', value: `**<t:${parseInt(guild.createdTimestamp / 1000)}:f> (<t:${parseInt(guild.createdTimestamp / 1000)}:R>)**`, inline: true},
                    { name: 'Membre', value: `**\`${invite.memberCount}(${invite.presenceCount} en ligne)\`**`, inline: true },
                    { name: 'Vanity URL', value: guild.vanityURLCode ? `**[.gg/${guild.vanityURLCode}](https://discord.com/invite/${guild.vanityURLCode})**` : `**\`Aucune\`**`}
                )
                .setColor('#EF8FB5')
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setImage(guild.bannerURL({ dynamic: true, size: 2048 }))
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                )

            const InviteInfo = new EmbedBuilder()
                .setAuthor(
                    { name: `inviteinfo - ${invite}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setTitle(`${emoji.bot.link} · Information sur l'invitation`)
                .setFields(
                    { name: 'Salon', value: `**\`${invite.channel.name}\`**`, inline: true },
                    { name: 'Type', value: `**\`${channelType[invite.channel.type]}\`**`, inline: true },
                    { name: 'NSFW', value: invite.channel.nsfw ? `**${emoji.bot.oui} \`Oui\`**` : `${emoji.bot.non} **\`Non\`**`, inline: true }
                )
                .setColor('#EF8FB5')
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                )

        const button1 = new ButtonBuilder()
            .setLabel('Icône')
            .setStyle(ButtonStyle.Link)
            .setURL(guild.iconURL({ dynamic: true, size: 2048}) ? guild.iconURL({ dynamic: true, size: 2048}) : "https://discord.com")
        const button2 = new ButtonBuilder()
            .setLabel('Bannière du serveur')
            .setStyle(ButtonStyle.Link)
            .setURL(guild.bannerURL({ dynamic: true, size: 2048 }) ? guild.bannerURL({ dynamic: true, size: 2048 }) : "https://discord.com")
        const button3 = new ButtonBuilder()
            .setLabel('Bannière de serveur')
            .setStyle(ButtonStyle.Link)
            .setURL(guild.splashURL({ dynamic: true, size: 2048 }) ? guild.splashURL({ dynamic: true, size: 2048 }) : "https://discord.com")

        const row = new ActionRowBuilder()
        if (guild.iconURL({ dynamic: true, size: 2048 })) {
            row.addComponents(button1)
        }
        if (guild.bannerURL({ dynamic: true, size: 2048 })) {
            row.addComponents(button2)
        }
        if (guild.splashURL({ dynamic: true, size: 2048 })) {
            row.addComponents(button3)
        }

        const select = (state) => {
            return new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setPlaceholder("Sélectionner une page")
                    .setCustomId('selct')
                    .setDisabled(state)
                    .setOptions(
                        { label: 'Informations sur le serveur', value: 'serverinviteinfo', emoji: emoji.bot.home },
                        { label: 'information sur l\'invitation', value: 'inviteinfo', emoji: emoji.bot.link }
                    )
            )
        }

        const initialMessage = await message.reply(
            { embeds: [ServerInvInfo], components: [select(false), row] }
        )

        const filter = (interaction) => interaction.user.id === message.author.id

        const collector = message.channel.createMessageComponentCollector(
            { filter: filter, time: 900000 }
        )
        
        collector.on('collect', (interaction) => {
            if (interaction.values[0] === 'serverinviteinfo') {
                interaction.update({ embeds: [ServerInvInfo], components: [select(false), row] }).catch((e) => {})
            } else if (interaction.values[0] === 'inviteinfo') {
                interaction.update({ embeds: [InviteInfo], components: [select(false), row] }).catch((e) => {})
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason == 'time') {
                initialMessage.edit(
                    { content: "L'interaction a expiré", components: [select(true), row]}
                )
            }
        })

        } catch (e) {
            
            const embed = new EmbedBuilder()
                .setAuthor(
                    { name: 'userinfo', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setColor('#FF0000')
                .setTitle(`${emoji.bot.non} · **__Cette invitation est invalide__**`)
                .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true}) }
                )
            
            const no = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel('Support')
                    .setEmoji(emoji.bot.support)
                    .setStyle(ButtonStyle.Link)
                    .setURL(config.support)
            )

            console.log('Une erreur est survenue:', e)

            return message.reply(
                { embeds: [embed], components: [no] }
            )
        }
}