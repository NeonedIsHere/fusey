const { EmbedBuilder, StringSelectMenuBuilder, ActionRowBuilder, ButtonBuilder,} = require('discord.js')
const Discord = require('discord.js')
const emoji = require('../emoji/utils/bot.json')
const pckg = require('../package.json')
const os = require('os')

module.exports.run = async (client, message, args) => {

    const home = new EmbedBuilder()
        .setAuthor(
            { name: `botinfo`, iconURL: client.user.displayAvatarURL({ dynamic: true })}
        )
        .setTitle(`${emoji.home} ・**__Accueil__**`)
        .setDescription(`Merci d'avoir ajouter ${client.user} sur votre serveur discord.\n\n${client.user} à commancer a être développer il y maintenant <t:1714721640:R> (le <t:1714721640:d>) et il été imaginé et développer par ${pckg.author} à la suite d'une idée de développer un bot 100% gratuit et qui contiens tout ceux dont un bot à besoins.\n\nVous trouverrais si dessous un menu sélecteur qui vous permettra d'avoir des embeds avec différente information.\n\nEn cas de problème avec le bot, n'hésiter pas a rejoindre le serveur support`)
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFooter({
            text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })
        })

    const identity = new EmbedBuilder()
        .setAuthor(
            { name: 'botinfo', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle(`${emoji.bot}・**__Identité__**`)
        .setFields(
            { name: 'Nom', value: `**${client.user} \`${client.user.tag}\`**`, inline: true },
            { name: 'ID', value: `**\`${client.user.id}\`**`, inline: true },
            { name: 'Date de création', value: `**<t:${Math.round(client.user.createdTimestamp / 1000)}:f> (<t:${Math.round(client.user.createdTimestamp / 1000)}:R>)**`, inline: true }
        )
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
        )

    const dev = new EmbedBuilder()
        .setAuthor(
            { name: 'botinfo', iconURL: client.user.displayAvatarURL({ dynamic: true })}
        )
        .setTitle(`${emoji.membre}・**__Développeur__**`)
        .setFields(
            { name: 'Nom', value: '**<@1055826086157615114> @neonedishere\n<@1209259539078058066> @atlasatm**', inline: true },
            { name: 'ID', value: '**`1055826086157615114`\n`1209259539078058066\`**', inline: true },
        )
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true })}
        )
    
    const startTime = Date.now() - (process.uptime() * 1000)
    const stats = new EmbedBuilder()
        .setAuthor(
            { name: 'botinfo', iconURL: client.user.displayAvatarURL({ dynamic: true }) }
        )
        .setTitle(`${emoji.info}・**__Statistique__**`)
        .setFields(
            { name: 'Uptime', value: `** <t:${Math.round(startTime / 1000)}:f> (<t:${Math.round(startTime / 1000)}:R>)**`, inline: true },
            { name: 'Serveurs', value: `**\`${client.guilds.cache.size}\`**`, inline: true  },
            { name: 'Utilisateurs', value: `**\`${client.users.cache.size}\`**`, inline: true  },
            { name: 'Salons', value: `**\`${client.channels.cache.size}\`**`, inline: true  },
            { name: 'Rôles', value: `**\`${client.guilds.cache.reduce((acc, guild) => acc + guild.roles.cache.size, 0)}\`**`, inline: true  },
            { name: 'Boosts', value: `**\`${client.guilds.cache.reduce((acc, guild) => acc + (guild.premiumSubscriptionCount || 0), 0)}\`**`, inline: true  },
            { name: 'Ping avec l\'API de discord', value: `**\`${client.ws.ping}ms\`**`, inline: true  }
        )
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
        )

    const hostname = os.hostname()
    let cpuName = "Aucun"
    const cpus = os.cpus()
    if (cpus.length > 0) {
        cpuName = cpus[0].model
    }
    const usedmemoryInMB = process.memoryUsage().heapTotal / 1024 / 1024

    const tech = new EmbedBuilder()
        .setAuthor(
            { name: 'botinfo', iconURL: client.user.displayAvatarURL() }
        )
        .setTitle(`**${emoji.config}・__Informations techniques__**`)
        .setDescription('Vous trouverez ci-dessous, quelque information intéresente si vous souhaitez vous aussi dévolopper votre propre bot ou un tout autre projet.')
        .setFields(
            { name: 'Hébergeur', value: `**\`${hostname}\`**`, inline: true },
            { name: 'Système d\'exploitation', value: `**\`${process.platform}\`**`, inline: true  },
            { name: 'Processeur', value: `**\`${cpuName}\`**` },
            { name: 'Mémoire utiliser', value: `**\`${usedmemoryInMB.toFixed(2)} Mo\`**` },
            { name: 'Node.js', value: `**\`${process.version}\`**`, inline: true },
            { name: 'Discord.js', value: `**\`${Discord.version}\`**`, inline: true }
        )
        .setColor('#EF8FB5')
        .setTimestamp()
        .setFooter(
            { text: `Demander par ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) }
        )

    const components = (state) => [
        new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
               .setCustomId("botinfo-menu")
               .setPlaceholder('Choisissez une option')
               .addOptions(
                    { label: 'Accueil', value: 'bothome', emoji: emoji.home },
                    { label: 'Identité', value: 'botidentity', emoji: emoji.bot },
                    { label: 'Développeur', value: 'botdev', emoji: emoji.membre },
                    { label: 'Statistique', value: 'botstats', emoji: emoji.info },
                    { label: 'Information technique', value: 'bottech', emoji: emoji.config }
                )
        )
    ]

    const initialMessage = await message.reply({ embeds: [home], components: components(false) })

    const filter = (interaction) => interaction.user.id === message.author.id

    const collector = message.channel.createMessageComponentCollector(
        { filter: filter, time: 900000 }
    )

    collector.on('collect', (interaction) => {
        if (interaction.values[0] === 'bothome') {
            interaction.update({ embeds: [home], componenets: components(false) }).catch((e) => {})
        } else if (interaction.values[0] === "botidentity") {
            interaction.update({ embeds: [identity], components: components(false) }).catch((e) => {})
        } else if (interaction.values[0] === "botdev") {
            interaction.update({ embeds: [dev], components: components(false) }).catch((e) => {})
        } else if (interaction.values[0] === "botstats") {
            interaction.update({ embeds: [stats], components: components(false) }).catch((e) => {})
        } else if (interaction.values[0] === "bottech") {
            interaction.update({ embeds: [tech], components: components(false) }).catch((e) => {})
        }
    })

    collector.on('end', (collected, reason) => {
        if (reason == "time") {
            initialMessage.edit(
                { content: 'L\'interaction à expiré.', components: components(true) }
            )
        }
    })
}