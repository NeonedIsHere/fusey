const Discord = require('discord.js');
const client = new Discord.Client({
    intents: new Discord.IntentsBitField(3276799)
});

const config = require("./config.json");
const token = config.token;
client.config = config;

const fs = require("fs");

const EventEmitter = require('events');
EventEmitter.setMaxListeners(70)

client.emoji = require('./emoji.json')

console.clear()

fs.readdir("./events", (_err, files) => {
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`[EVENT] ✨ ${eventName} loaded!`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.commands = new Discord.Collection();

fs.readdir("./commands", (_err, files) => {
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, {
            name: commandName,
            ...props
        });
        console.log(`[COMMAND] 🌐 ${commandName} loaded!`);
    });
});

client.once("ready", () => {
    console.log(`[STATUS] 🤖 ${client.user.tag} est en ligne.\n[LINK] Liens d'invitation > https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\n[LINK] Liens du support > ${config.support}`)
});


//AntiCrash
process.on('unhandledRejection', (error) => {
    console.log('[antiCrash] :: Unhandled Rejection/Catch');
    console.log(error);
});
  
process.on("uncaughtException", (error, origin) => {
    console.log('[antiCrash] :: Uncaught Exception/Catch');
    console.log(error);
    console.log('Information supplémentaire:', origin);
});
  
process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log('[antiCrash] :: Uncaught Exception Monitor/Catch');
    console.log(error);
    console.log('Information supplémentaire:', origin);
});
  
process.on('beforeExit', (code) => {
    console.log('[antiCrash] :: Before Exit');
    console.log('Code de sortie:', code);
});
  
process.on('exit', (code) => {
    console.log('[antiCrash] :: Exit');
    console.log('Code de sortie:', code);
});

client.login(token)