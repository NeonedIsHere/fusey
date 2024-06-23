const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
const config = require('../config.json')
const emoji = require('../emoji.json')

module.exports.run = (client, message, args) => {

    if (message.author.id !== message.guild.ownerId) {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: 'clearchannel', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
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
                { name: 'clearchannel', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.bot.non}・**__Veuillez mentionner un salon ou indiquer un nom de salon__**`)
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

    const channelName = message.mentions.channels.first()?.name || message.guild.channels.cache.get(args[0])?.name || args.join(" ")
    const channelsToDelete = message.guild.channels.cache.filter(channel => channel.name === channelName)

    if (channelsToDelete.size === 0) {

        const flop = new EmbedBuilder()
            .setAuthor(
                { name: 'clearchannel', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.bot.non}・**__Aucun salon trouvé avec ce nom__**`)
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
            { name: `clearchannel - ${channelName}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle(`${emoji.bot.info}・**__Suppressions de ${channelsToDelete.size} salon(s) en cours__...**`)
        .setDescription(`Un total de **\`${channelsToDelete.size}\`** ayant pour nom **\`${channelName}\`** sont en cours de suppressions`)
        .setColor('#00ABFF')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
        )
    message.reply({ embeds: [embedInfo] }).then(() => {
        let successfulDeletions = 0

        channelsToDelete.forEach(async (channel) => {
            try {

                await channel.delete()
                successfulDeletions++

            } catch (error) {

                const flop = new EmbedBuilder()
                    .setAuthor(
                        { name: 'clearchannel - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
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
                { name: `clearchannel - ${channelName}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setTitle(`${emoji.bot.oui}・**__Suppression de ${channelsToDelete.size} salon(s) effectuez avec succès__**`)
            .setDescription(`Un total de **\`${channelsToDelete.size}\`** ayant pour nom **\`${channelName}\`** ont été supprimer avec succès`)
            .setColor('#00FF00')
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        message.channel.send({ embeds: [embedSuccess] })
        
    }).catch((error) => {

    })

}