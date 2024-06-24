const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Invite, Component } = require("discord.js")
const config = require('../config.json')
const emoji = require('../emoji.json')

module.exports.run = async (client, message, args) => {
    
    const embed = new EmbedBuilder()
        .setAuthor({
            name: `Inviter ${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
        })
        .setTitle("Invitation du bot")
        .setDescription(`Pour inviter le bot, vous pouvez cliquer **[ici](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)** ou cliquez sur le bouton **\`Inviter le bot\`**. Vous avez également la possibilité de rejoindre le serveur support en cliquant **[ici](${config.support})** ou en cliquant sur le bouton **\`Serveur Support\`**`)
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL() }
        )

    const Row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setLabel("Inviter le bot")
            .setStyle("Link")
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
            .setEmoji(emoji.bot.link),
        new ButtonBuilder()
            .setLabel("Serveur support")
            .setStyle('Link')
            .setURL(config.support)
            .setEmoji(emoji.bot.support)
    )
    message.reply({ embeds: [embed], components: [Row]})
}