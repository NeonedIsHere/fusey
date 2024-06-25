const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');
const emoji = require('../emoji/utils/bot.json');
const { e } = require('unocss');

module.exports.run = async (client, message, args) => {
    if (!config.devId.includes(message.author.id)) {
        return message.reply('Vous n\'avez pas la permission d\'utiliser cette commande.');
    }

    try {
        const code = args.join(' ');
        let evaled = eval(code);

        if (typeof evaled !== 'string') {
            evaled = require('util').inspect(evaled);
        }

        // Tentative de parsing JSON
        let isJson = false;
        let jsonString = "";
        try {
            jsonString = JSON.stringify(JSON.parse(evaled), null, 2);
            isJson = true;
        } catch (error) {
            isJson = false;
        }

        const embed = new EmbedBuilder()
            .setAuthor(
                { name: 'eval', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setColor('#00FF00')
            .setTitle(`${emoji.oui}・**__Évaluation réussie__**`)
            .addFields(
                { name: 'Entrée', value: `\`\`\`js\n${code}\n\`\`\`` },
                { name: 'Sortie', value: isJson ? `\`\`\`json\n${jsonString}\n\`\`\`` : `\`\`\`js\n${evaled}\n\`\`\`` }
            )
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        message.channel.send({ embeds: [embed] })
    } catch (err) {
        const embed = new EmbedBuilder()
            .setAuthor(
                { name: 'eval', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
            )
            .setColor('#FF0000')
            .setTitle(`${emoji.non}・**__Erreur__**`)
            .addFields(
                { name: 'Entrée', value: `\`\`\`js\n${args.join(' ')}\n\`\`\`` },
                { name: 'Erreur', value: `\`\`\`js\n${err}\n\`\`\`` }
            )
            .setTimestamp()
            .setFooter(
                { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
            )

        message.channel.send({ embeds: [embed] });
    }
};
