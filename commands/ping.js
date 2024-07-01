const Discord = require('discord.js')
const config = require('../config.json')

module.exports.run = async (client, message, args) => {
    let m = await message.reply("Envois de requête à l'API...")
    let pong = new Discord.EmbedBuilder()
        .setAuthor(
            {
                name: `ping`,
                iconURL: client.user.displayAvatarURL()
            }
        )
        .setTitle(`Ping de ${client.user.username}`)
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFields(
            {
                name: "Latence",
                value: `${m.createdTimestamp - message.createdTimestamp}ms`,
                inline: true
            },
            {
                name: "API Latence",
                value: `${Math.round(message.client.ws.ping)}ms`,
                inline: true
            }
        )
        .setFooter(
            {
                text: `Demander par ${message.author.displayName}`,
                iconURL: message.author.displayAvatarURL()
            }
        )
    m.delete()
    message.reply(
        {
            content: "🏓 Pong!",
            embeds: [pong]
        }
    )
}