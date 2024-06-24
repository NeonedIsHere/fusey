const { EmbedBuilder } = require('discord.js');
const config = require('../config.json');

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
            .setColor('Green')
            .setTitle('Évaluation réussie')
            .addFields(
                { name: 'Entrée', value: `\`\`\`js\n${code}\n\`\`\`` },
                { name: 'Sortie', value: isJson ? `\`\`\`json\n${jsonString}\n\`\`\`` : `\`\`\`js\n${evaled}\n\`\`\`` }
            );

        message.channel.send({ embeds: [embed] });
    } catch (err) {
        const embed = new EmbedBuilder()
            .setColor('Red')
            .setTitle('Erreur')
            .addFields(
                { name: 'Entrée', value: `\`\`\`js\n${args.join(' ')}\n\`\`\`` },
                { name: 'Erreur', value: `\`\`\`js\n${err}\n\`\`\`` }
            );

        message.channel.send({ embeds: [embed] });
    }
};
