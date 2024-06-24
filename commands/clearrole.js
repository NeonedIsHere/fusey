const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const emoji = require('../emoji.json')
const config = require('../config.json')

module.exports.run = async (client, message, args) => {

    if (message.author.id !== message.guild.ownerId) {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: 'clearrole - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`**${emoji.bot.non}・__Vous devez être le propriétaire pour executer la commande__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )
        
        const flopButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji(emoji.bot.support)
                .setLabel('Support')
                .setStyle(ButtonStyle.Link)
                .setURL(config.support)
        )

        return message.reply({ embeds: [flop], components: [flopButton] })

    }

    if (!args[0]) {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: 'clearrole - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.bot.non}・**__Veuillez mentionner un rôle ou indiquer un nom de salon__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        const flopButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji(emoji.bot.support)
                .setLabel('Support')
                .setStyle(ButtonStyle.Link)
                .setURL(config.support)
        )
    
        return message.reply({ embeds: [flop], components: [flopButton] })
    }

    const rolename = message.mentions.roles.first()?.name || message.guild.roles.cache.get(args[0])?.name || args.join(" ")
    const rolesToDelete = message.guild.roles.cache.filter(role => role.name === rolename)

    if (rolesToDelete.size === 0) {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: 'clearrole - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.bot.non}・**__Aucun rôle trouvé avec ce nom__**`)
            .setDescription(`Vous devez envoyer une invitation. En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        const flopButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji(emoji.bot.support)
                .setLabel('Support')
                .setStyle(ButtonStyle.Link)
                .setURL(config.support)
        )
    
        return message.reply({ embeds: [flop], components: [flopButton] })

    }

    const embedInfo = new EmbedBuilder()
        .setAuthor(
            { name: `clearrole - ${rolename}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle(`${emoji.bot.info}・**__Suppressions de ${rolesToDelete.size} rôle(s) en cours__...**`)
        .setDescription(`Un total de **\`${rolesToDelete.size}\`** ayant pour nom **\`${rolename}\`** sont en cours de suppressions`)
        .setColor('#00ABFF')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
        )
    message.reply({ embeds: [embedInfo] }).then(() => {
        let successfulDeletions = 0

        rolesToDelete.forEach(async (role) => {
            try {

                await role.delete()
                successfulDeletions++

            } catch (error) {

                const flop = new EmbedBuilder()
                    .setAuthor(
                        { name: 'clearrole - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
                    )
                    .setTitle(`${emoji.bot.non}・**__Une erreur est survenu__**`)
                    .setFields(
                        { name: 'Description de l\'erreur', value: `\`\`\`${erreur}\`\`\``, inline: true }
                    )
                    .setColor('#000001')
                    .setTimestamp()
                    .setFooter(
                        { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
                    )

                    return message.reply({ embeds: [flop] })
                    console.log(erreur)

            }
        })

        const embedSuccess = new EmbedBuilder()
            .setAuthor(
                { name: `clearrole - ${rolename}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.bot.oui}・**__Suppression de ${rolesToDelete.size} rôle(s) effectuez avec succès__**`)
            .setDescription(`Un total de **\`${rolesToDelete.size}\`** rôle(s) ayant pour nom **\`${rolename}\`** ont été supprimer avec succès`)
            .setColor('#00FF00')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        message.channel.send({ embeds: [embedSuccess] })
        
    }).catch((error) => {

    })

}