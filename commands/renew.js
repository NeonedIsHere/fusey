const { PermissionFlagsBits, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');
const emoji = require('../emoji/utils/bot.json');

module.exports.run = async (client, message, args) => {

    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {

        const flop = new EmbedBuilder()
            .setAuthor({ name: 'renew - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTitle(`${emoji.non}・**__Vous n'avez pas les permissions nécessaires pour effectuer cette commande__**`)
            .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setFields({ name: 'Permission(s) manquante', value: `\`\`\`yaml\n- Gérer les salons\`\`\`` })
            .setColor('#FF0000')
            .setTimestamp()
            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

        const flopButton = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setEmoji(emoji.support)
                .setLabel('support')
                .setStyle(ButtonStyle.Link)
                .setURL(config.support)
        );

        return message.reply({ embeds: [flop], components: [flopButton] });

    } else {

        try {
            // Attempt to delete the original channel
            await message.channel.delete();

            // Clone the channel
            const channel2 = await message.channel.clone({ reason: `Salon recréé par ${message.author.username}` });

            // Send the confirmation message in the cloned channel
            const yes = new EmbedBuilder()
                .setAuthor({ name: 'renew', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTitle(`${emoji.oui}・**__Salon recréé__**`)
                .setDescription(`Le salon ${channel2} a été recréé avec succès`)
                .setColor('#00FF00')
                .setTimestamp()
                .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

            await channel2.send({ content: message.author.toString(), embeds: [yes] }).then(m => setTimeout(() => m.delete(), 7500));

        } catch (error) {
            // Handle any errors that occur during channel deletion or cloning
            console.error('Erreur lors de la suppression ou du clonage du canal:', error);

            const flop = new EmbedBuilder()
                .setAuthor({ name: 'renew - error', iconURL: client.user.displayAvatarURL({ dynamic: true }) })
                .setTitle(`${emoji.non}・**__Impossible de recréer le salon des règles de la communauté__**`)
                .setDescription(`En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
                .setColor('#FF0000')
                .setTimestamp()
                .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

            const flopButton = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setEmoji(emoji.support)
                    .setLabel('support')
                    .setStyle(ButtonStyle.Link)
                    .setURL(config.support)
            );

            // Inform the user of the error
            return message.reply({ embeds: [flop], components: [flopButton] });
        }
    }
};
