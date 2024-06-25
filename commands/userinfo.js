const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require('discord.js');
const emoji = require('../emoji/utils/bot.json');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    try {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
        const member = message.guild.members.cache.get(user.id);

        if (!user) {
            console.error('User is undefined');
            return;
        }

        let bannerURL;
        if (user) {
            bannerURL = await user.fetch().then(u => u.bannerURL({ dynamic: true, size: 2048 }));
        }

        const flags = {
            Staff: emoji.badge.staff,
            Partner: emoji.badge.partner,
            BugHunterLevel1: emoji.badge.bughunter1,
            BugHunterLevel2: emoji.badge.bughunter2,
            Hypesquad: emoji.badge.hypesquad,
            HypeSquadOnline1: emoji.badge.h1,
            HypeSquadOnline2: emoji.badge.h2,
            HypeSquadOnline3: emoji.badge.h3,
            PremiumEaelySupporter: emoji.badge.premium,
            VerifiedDeveloper: emoji.badge.developer,
            ActiveDeveloper: emoji.badge.activedev,
            CertifiedModerator: emoji.badge.certifiedmod
        };

        let userFlags;
        try {
            userFlags = (await user.fetchFlags()).toArray().map(flag => flags[flag]).join(", ");
        } catch (e) {
            console.error('Error fetching user flags', e);
            userFlags = 'Unable to fetch flags';
        }
        const UserBadges = userFlags.length !== 0 ? userFlags : 'Aucun badge trouvé pour cet utilisateur.';

        const embedNop = new EmbedBuilder()
            .setAuthor({ name: `userinfo ${user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTitle(`${emoji.non} Cet utilisateur n'existe pas`)
            .setDescription(`Merci de mentionner un utilisateur valide. En cas d'erreur, merci de le communiquer au développeur en rejoignant le **[support](${config.support})** ou en cliquant sur le bouton **\`support\`** ci-dessous`)
            .setColor('#ff0000')
            .setTimestamp()
            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

        const ButtonSupport = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel('Support')
                .setEmoji(emoji.support)
                .setStyle(ButtonStyle.Link)
                .setURL(config.support)
        );

        if (!member) return message.reply({ embeds: [embedNop], components: [ButtonSupport] });

        const userinfo = new EmbedBuilder()
            .setAuthor({ name: `userinfo ${user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTitle(`${emoji.membre}・**__Informations sur l'utilisateur__**`)
            .addFields(
                { name: 'Nom', value: `**${user} \`@${user.username}\`**`, inline: true },
                { name: 'ID', value: `**\`${user.id}\`**`, inline: false },
                { name: 'Badge', value: UserBadges, inline: true },
                { name: 'Date de création', value: `**<t:${parseInt(user.createdTimestamp / 1000)}:f> (<t:${parseInt(user.createdTimestamp / 1000)}:R>)**` },
                { name: 'Bot', value: user.bot ? `**${emoji.oui} \`Oui\`**` : `**${emoji.non} \`Non\`**` },
                { name: "Autre", value: `**\`🧨 Utilisateur du bot\`**` }
            )
            .setColor("#EF8FB5")
            .setTimestamp()
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setImage(bannerURL);

        const userServerInfo = new EmbedBuilder()
            .setAuthor({ name: `userinfo - ${user.username}`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setTitle(`${emoji.support}`)
            .addFields(
                { name: 'Pseudo de serveur', value: member.nickname ? `**\`${member.nickname}\`**` : '**`Aucun`**', inline: true },
                { name: 'Rejoins', value: `**<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)**` }
            )
            .setColor("#EF8FB5")
            .setTimestamp()
            .setFooter({ text: `Demandé par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) });

        const button1 = new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel('Avatar')
            .setURL(user.displayAvatarURL({ dynamic: true, size: 2048 }) ? user.displayAvatarURL({ dynamic: true, size: 2048 }) : "https://discord.com/invite/");

        const button2 = new ButtonBuilder()
            .setLabel('Bannière')
            .setStyle(ButtonStyle.Link)
            .setURL(bannerURL ? bannerURL : "https://discord.com/invite/");

        const select = (state) => [
            new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setDisabled(state)
                    .setPlaceholder('Choisissez la page')
                    .addOptions([
                        { label: 'Utilisateur', value: 'userinfo', emoji: emoji.membre },
                        { label: 'Serveur', value: 'serveruserinfo', emoji: emoji.support }
                    ])
            )
        ];

        const row = new ActionRowBuilder();
        if (user.displayAvatarURL({ dynamic: true })) {
            row.addComponents(button1);
        }
        if (bannerURL) {
            row.addComponents(button2);
        }

        const initialMessage = await message.reply({ embeds: [userinfo], components: select(false).concat(row) });

        const filter = (interaction) => interaction.user.id === message.author.id;

        const collector = message.channel.createMessageComponentCollector({ filter, time: 900000 });

        collector.on('collect', async (interaction) => {
            try {
                if (interaction.values[0] === 'userinfo') {
                    await interaction.update({ embeds: [userinfo], components: select(false).concat(row) });
                } else if (interaction.values[0] === 'serveruserinfo') {
                    await interaction.update({ embeds: [userServerInfo], components: select(false).concat(row) });
                }
            } catch (err) {
                console.error('Error while updating interaction', err);
                // Send an ephemeral message to the user if interaction fails
                await interaction.followUp({ content: 'There was an error while processing your request.', ephemeral: true });
            }
        });

        collector.on('end', async (collected, reason) => {
            if (reason === 'time') {
                try {
                    await initialMessage.edit({ content: "L'interaction a expiré", components: select(true).concat(row) });
                } catch (err) {
                    console.error('Error while editing initial message', err);
                }
            }
        });
    } catch (err) {
        console.error(err);
        const embedError = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Erreur')
            .addFields(
                { name: 'Entrée', value: `\`\`\`js\n${args.join(' ')}\n\`\`\`` },
                { name: 'Erreur', value: `\`\`\`js\n${err}\n\`\`\`` }
            );

        message.channel.send({ embeds: [embedError] });
    }
};
