const config = require("../config.json")
const emoji = require('../emoji/utils/bot.json')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ActivityType, ButtonStyle } = require('discord.js')

module.exports = (client, message) => {

    const embed = new EmbedBuilder()
        .setAuthor(
            { name: `Besoin d'aide ?`, iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle(`${emoji.info}・Mon prefixe est ${config.prefix}`)
        .setDescription(`Vous pouvez également utilisez la commande **\`${config.prefix}help\`** pour afficher le menu d'aide intéractif.`)
        .setFooter(
            {
                text: ` Demandé par ${message.author.displayName}`, iconURL: message.author.displayAvatarURL({ dynamic: true })
            }
        )
        .setColor('#EF8FB5')
        .setTimestamp()

    const invite = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
           .setLabel("Inviter le bot")
           .setStyle(ButtonStyle.Link)
           .setEmoji(emoji.link)
           .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`),
        new ButtonBuilder()
            .setLabel('Rejoindre le support')
           .setEmoji(emoji.support)
           .setStyle(ButtonStyle.Link)
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
            type: ActivityType.Streaming,
            url: 'https://www.twitch.tv/#',
        },
        {
            name: `By neonedishere & atlasatm`,
            type: ActivityType.Streaming,
            url: 'https://www.twitch.tv/#',
        },
        {
            name: `La v1 sort Bientôt`,
            type: ActivityType.Streaming,
            url: 'https://www.twitch./#'
        },
        {
            name: `Dev with ❤️`,
            type: ActivityType.Streaming,
            url: 'https://www.twitch.tv/#'
        }
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
