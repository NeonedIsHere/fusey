const Discord = require('discord.js');
const client = new Discord.Client({
    intents: new Discord.IntentsBitField(3276799)
});

const config = require("./config.json");
const token = config.token;
client.config = config;

const fs = require("fs");
const path = require('path');

const { createLogger, transports, format } = require('winston');

const moment = require('moment')
const adjustedTimestamp = () => moment().utcOffset(120).format('YYYY-MM-DD HH:mm:ss')

// Vérifier si le dossier logs existe, sinon le créer
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Créer un logger pour les logs généraux
const infoLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({level, message, ...metadata }) => {
      let msg = `${adjustedTimestamp} [${level}] : ${message}`;
      for (const key in metadata) {
        msg += `\n${key}: ${metadata[key]}`;
      }
      return msg;
    })
  ),
  transports: [
    new transports.File({ filename: path.join(logDirectory, 'log.yaml') })
  ]
});

// Créer un logger pour les erreurs
const errorLogger = createLogger({
    level: 'error',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: false }),  // Inclure le stack des erreurs
      format.printf(({ timestamp, level, message, ...metadata }) => {
        let msg = `${timestamp} [${level}] : ${message}`;
        if (metadata) {
          msg += ' ' + JSON.stringify(metadata, null, 2);  // Formater les métadonnées avec indentation
        }
        return msg + '\n';  // Ajouter un retour à la ligne après chaque log
      })
    ),
    transports: [
      new transports.File({ filename: path.join(logDirectory, 'errors.yaml') })
    ]
  });

const EventEmitter = require('events');
EventEmitter.setMaxListeners(70);

console.clear();

// Connexion à la DataBase
const mysql = require('mysql')
const db = mysql.createConnection(
  { host: config.BDD.host, user: config.BDD.user, password: config.BDD.password, database: config.BDD.database, charset: config.BDD.charset, connectTimeout: 30000 }
)

db.connect((err) => {

  if (err) {

    console.log(`[DataBase] ⚠️ > MySQL > Echec de connexion a la database :`, err)
    errorLogger.error(err) 
    return

  }

  console.log(`[DataBase] 🟢 > MySQL > Connection établie à la database`)

})

db.end((err) => {

  if (err) {

    console.log(`[DataBase] ⚠️ > MySQL > Erreur lors de la fermeture de la connexion a la database :`, err)
    errorLogger.error(err)
    return
  }

  console.log(`[DataBase] 🔴 > MySQL > La connexion a la database a été fermer`)

})


// Charger les events
fs.readdir("./events", (_err, files) => {
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`[EVENT] ✨ > ${eventName} > loaded!`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

// Charger les commandes
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
        console.log(`[COMMAND] 🌐 > ${commandName} > loaded!`);
    });
});

client.once("ready", () => {
    const startupMessage = `[STATUS] 🤖 > ${client.user.tag} > En ligne\n[LINK] 🔗 > Liens d'invitation > https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\n[LINK] 🔗 > Liens du support > ${config.support}`;
    console.log(startupMessage + '\n\n');
});

// Redirection des logs de console vers le fichier log.txt
const consoleLog = console.log;
console.log = (...args) => {
  infoLogger.info(args.join(' '));
  consoleLog(...args);
};

// AntiCrash
process.on('unhandledRejection', (error) => {
  console.log('[antiCrash] :: Unhandled Rejection/Catch');
  console.log(error);
  errorLogger.error('Unhandled Rejection/Catch', { message: error.message, stack: error.stack });
});
  
process.on("uncaughtException", (error, origin) => {
  console.log('[antiCrash] :: Uncaught Exception/Catch');
  console.log(error);
  console.log('Information supplémentaire:', origin);
  errorLogger.error('Uncaught Exception/Catch', { message: error.message, stack: error.stack, origin: origin });
});
  
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log('[antiCrash] :: Uncaught Exception Monitor/Catch');
  console.log(error);
  console.log('Information supplémentaire:', origin);
  errorLogger.error('Uncaught Exception Monitor/Catch', { message: error.message, stack: error.stack, origin: origin });
});
  
process.on('beforeExit', (code) => {
  console.log('[antiCrash] :: Before Exit');
  console.log('Code de sortie:', code);
  infoLogger.info('Before Exit', { code: code });
});
  
process.on('exit', (code) => {
  console.log('[antiCrash] :: Exit');
  console.log('Code de sortie:', code);
  infoLogger.info('Exit', { code: code });
});

client.login(token);