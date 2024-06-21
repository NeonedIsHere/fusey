const config = require("../config.json")
const emoji = require('../emoji.json')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ActivityType } = require('discord.js')

module.exports = (client, message) => {

    const embed = new EmbedBuilder()
        .setAuthor(
            { name: `Besoin d'aide ?`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle(`Mon prefixe est ${config.prefix}`)
        .setDescription(`Vous pouvez également utilisez la commande **\`${config.prefix}help\`** pour afficher le menu d'aide intéractif.`)
        .setFooter(
            {
                text: ` Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })
            }
        )
        .setColor('#EF8FB5')
        .setTimestamp()

    const invite = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
           .setLabel("Inviter le bot")
           .setStyle("Link")
           .setEmoji(emoji.bot.link)
           .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`),
        new ButtonBuilder()
            .setLabel('Rejoindre le support')
           .setEmoji(emoji.bot.support)
           .setStyle('Link')
           .setURL(config.support)
    )

    if (message.author.bot) return
    if (message.content === "<@" + client.user.id + ">") return message.reply({ embeds: [embed], components: [invite] })
    if (message.content.indexOf(client.config.prefix)!== 0) return
    
    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command)
    
    const activities = [
        {
            name: 'Bot bêta de @Fus-&#1827',
            type: ActivityType.Custom,
            url: 'https://www.twitch.tv/zeus1337',
        },
        {
            name: `By neonedishere`,
            type: ActivityType.Custom,
            url: 'https://www.twitch.tv/zeus1337',
        },
    ];
    let actualActivity = 0;
    setInterval(async () => {
        client.user.setPresence({
            activities: [activities[actualActivity % activities.length]],
            status: 'dnd',
        });

        actualActivity++;
    }, 5_000);
    
    if (!cmd) return
    cmd.run(client, message, args, config)
    
}
