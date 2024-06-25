const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Invite, Component, ButtonStyle } = require("discord.js")
const config = require('../config.json')
const emoji = require('../emoji/utils/bot.json')

module.exports.run = async (client, message, args) => {
    
    const embed = new EmbedBuilder()
        .setAuthor({
            name: `Inviter ${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
        })
        .setTitle(`${emoji.link}・**__Liens utiles__**`)
        .setDescription(`Pour inviter le bot, vous pouvez cliquer **[ici](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot)** ou cliquez sur le bouton **\`Inviter le bot\`**. Vous avez également la possibilité de rejoindre le serveur support en cliquant **[ici](${config.support})** ou en cliquant sur le bouton **\`Serveur Support\`**`)
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL() }
        )

    const Row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setLabel("Inviter le bot")
            .setStyle(ButtonStyle.Link)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
            .setEmoji(emoji.link),
        new ButtonBuilder()
            .setLabel("Serveur support")
            .setStyle(ButtonStyle.Link)
            .setURL(config.support)
            .setEmoji(emoji.support)
    )
    message.reply({ embeds: [embed], components: [Row]})
}