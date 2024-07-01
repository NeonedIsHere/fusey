const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits } = require('discord.js')
const emoji = require('../emoji/utils/bot.json')
const config = require('../config.json')

module.exports.run = async (client,message, args) => {

    message.user = message.author


    if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: 'massrole - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.non}・**__Vous n'avez pas la permission d'utiliser cette commande__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .addFields(
                { name: 'Permission(s) manquante', value: `\`\`\`yaml\nAdministrateur\`\`\``}
            )
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji(emoji.support)
                .setLabel('Support')
                .setStyle(ButtonStyle.Link)
                .setURL(config.support)
            )

        return message.reply({ embeds: [flop], components: [row] })

    }

    const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])

    if (!role) {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: 'massrole - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.non}・**__Vous devez menntioner un rôle__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji(emoji.support)
                .setLabel('Support')
                .setStyle(ButtonStyle.Link)
                .setURL(config.support)
            )

        return message.reply({ embeds: [flop], components: [row] })

    }

    if (role.position >= message.member.roles.highest.position) {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: 'massiverole - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.non}・**__Ce rôles est au dessus de votre rôle le plus haut__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji(emoji.support)
                .setLabel('Support')
                .setStyle(ButtonStyle.Link)
                .setURL(config.support)
            )

        return message.reply({ embeds: [flop], components: [row] })

    }

    if (role.position >= message.guild.members.cache.get(client.user.id).roles.highest.position) {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: 'massrole - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.non}・**__Ce rôle est au dessus de mon rôle le plus haut__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji(emoji.support)
                .setLabel('Support')
                .setStyle(ButtonStyle.Link)
                .setURL(config.support)
            )

        return message.reply({ embeds: [flop], components: [row] })

    }

    if (!role.editable) {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: 'massrole - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.non}・**__Ce rôle est un rôle d'intégration__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji(emoji.support)
                .setLabel('Support')
                .setStyle(ButtonStyle.Link)
                .setURL(config.support)
            )

        return message.reply({ embeds: [flop] })

    }

    const row2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setEmoji(emoji.membre)
            .setCustomId('maddhumans')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setEmoji(emoji.bot)
            .setCustomId('maddbot')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setEmoji(emoji.infini)
            .setCustomId('maddall')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setEmoji(emoji.non)
            .setCustomId('maddstop')
            .setStyle(ButtonStyle.Danger)
    )

    const em = new EmbedBuilder()
        .setAuthor(
            { name: `massrole - @${role.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle(`${emoji.question}・**__Que souhaitez vous faire ?__**`)
        .setDescription(`Vous êtes sur le point de donner le rôle <@&${role.id}> à ${message.guild.memberCount} membre du serveur\n\n\n- ${emoji.membre}・Attribuer le rôle	aux **__Humain__**\n- ${emoji.bot}・Attribuer le rôle aux **__Bot__**\n- ${emoji.infini}・Attribuer le rôle à **__tout les Membre__**\n- ${emoji.non}・Annuler l'action en cours`)
        .setColor('#ffb000')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
        )

    const menumsg = await message.reply({ embeds: [em], components: [row2] })

    function menuSelection(i) {
        used1 = true
    }

    let filter = i => i.user.id === message.author.id

    let msg = menumsg

    let col = msg.createMessageComponentCollector(
        { filter }
    )

    col.on('collect', async (i) => {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: `massrole - ${role.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.non}・**__Vous n'êtes pas l'auteur de la commande__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        const flopButton = new ButtonBuilder()
            .setEmoji(emoji.support)
            .setLabel('Support')
            .setStyle(ButtonStyle.Link)
            .setURL(config.support)

            if (i.user.id !== message.author.id) return i.reply({ embeds: [flop], components: [flopButton] })

        if (i.customId === 'maddall') {

            let count = 0

            const pending = new EmbedBuilder()
                .setAuthor(
                    { name: `massrole - @${role.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setTitle(`${emoji.info}・**__Attribution du rôles en cours__**...`)
                .setDescription(`Le rôle <@&${role.id}> sera donnée a \`${message.guild.memberCount}\` ${message.guild.memberCount > 1 ? "membres" : "membre" }.`)
                .setColor('#00ABFF')
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                )
            
            i.reply({ embeds: [pending] }).then(async m => {
                await message.guild.members.cache.filter(m => !m.roles.cache.has(role.id)).forEach(member => {
                    member.roles.add(role.id)
                })

                const okay = new EmbedBuilder()
                    .setAuthor(
                        { name: `massrole - @${role.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                    )
                    .setTitle(`${emoji.oui}・**__Le rôles à été correctement donnée__**`)
                    .setDescription(`Le rôle <@&${role.id}> à été donnée à **\`${message.guild.memberCount} ${message.guild.memberCount > 1 ? "membres" : "membre"}\`**`)
                    .setColor('#00FF00')
                    .setTimestamp()
                    .setFooter(
                        { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                    )

                message.channel.send({ embeds: [okay] })
                
                if (count === message.guild.memberCount) return message.channel.send({ embeds: [okay] })

            })

        }

        if (i.customId === "maddhumans") {

            let count = 0

            const pending = new EmbedBuilder()
                .setAuthor(
                    { name: `massrole - @${role.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setTitle(`${emoji.info}・**__Attribution du rôle en cours__**...`)
                .setDescription(`Le rôle <@&${role.id}> sera donnée à **\`${message.guild.members.cache.filter(m => !m.user.bot).size} ${message.guild.members.cache.filter(m => m.roles.cache.has(role.id)).size > 1 ? "humains" : "humain"}\`**`)
                .setColor('#00ABFF')
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                )

            i.reply({ embeds: [pending] }).then(m => {
                message.guild.members.cache.filter(m => !m.user.bot && !m.roles.cache.has(role.id)).forEach(member => {
                    member.roles.add(role.id)
                })

                const okay = new EmbedBuilder()
                    .setAuthor(
                        { name: `massrole - @${role.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                    )
                    .setTitle(`${emoji.oui}・**__Le rôle à correctement donnée__**`)
                    .setDescription(`Le rôle <@&${role.id}> a été donnée à **\`${message.guild.members.cache.filter(m => !m.user.bot).size} ${message.guild.members.cache.filter(m => m.roles.cache.has(role.id)).size > 1 ? "humains" : "humain"}\`**`)
                    .setColor('#00FF00')
                    .setTimestamp()
                    .setFooter(
                        { text: `Demander par ${message.author.displayName }`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                    )
                
                message.channel.send({ embeds: [okay] })

                if (count === message.guild.memberCount) return message.channel.send({ embeds: [okay] })

            })

        }

        if (i.customId === "maddbot") {

            let count = 0

            const pending = new EmbedBuilder()
                .setAuthor(
                    { name: `massrole - @${role.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setTitle(`${emoji.info}・**__Attribution du rôle en cours__**...`)
                .setDescription(`Le rôle <@&${role.id}> sera donné à **\`${message.guild.members.cache.filter(m => m.user.bot).size} ${message.guild.members.cache.filter(m => m.roles.cache.has(role.id)).size > 1 ? 'bots' : 'bot'}\`**`)
                .setColor('#00ABFF')
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                )

            i.reply({ embeds: [pending] }).then(m => {

                message.guild.members.cache.filter(m => m.user.bot && !m.roles.cache.has(role.id)).forEach(member => {
                    member.roles.add(role.id)
                })

                const okay = new EmbedBuilder()
                    .setAuthor(
                        { name: `massrole - @${role.name}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                    )
                    .setTitle(`${emoji.oui}・**__Le rôle à correctement été donné__**`)
                    .setDescription(`Le rôle <@&${role.id}> à été donné a **\`${message.guild.members.cache.filter(m => m.user.bot).size} ${message.guild.members.cache.filter(m => m.roles.cache.has(role.id)).size > 1 ? 'bots' : 'bot'}\`**`)
                    .setColor('#00FF00')
                    .setTimestamp()
                    .setFooter(
                        { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                    )

                message.channel.send({ embeds: [okay] })

                if (count === message.guild.memberCount) return message.channel.send({ embeds: [okay] })

            })

        }

        if (i.customId === 'maddstop') {

            const stop = new EmbedBuilder()
                .setAuthor(
                    { name: 'massrole - Annuler', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                )
                .setTitle(`${emoji.non}・**__Attribution annuler__**`)
                .setDescription(`Le rôle <@&${role.id}> ne sera donné a personne`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter(
                    { text: `Demander par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                )
            
            return i.channel.send({ embeds: [stop] })

        }

        if (i) {
            msg.components.forEach((row) => {
                row.components.forEach((component) => {
                    component.data.disabled = true
                })
            })

            await i.update({ components: msg.components })

        }

    })

}