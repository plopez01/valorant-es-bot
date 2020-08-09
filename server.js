//CODED BY PLOPEZ#6020
//DEFINITIONS
const fs = require('fs');
const Discord = require('discord.js');
const Sequelize = require('sequelize');
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();

console.log("Cargando config...");
const { prefix, token, mant } = require('./config.json');

console.log("Cargando bases de datos...");
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

/*
 * equivalent to: CREATE TABLE tags(
 * name VARCHAR(255),
 * description TEXT,
 * username VARCHAR(255),
 * usage INT
 * );
 */
const warns = sequelize.define('warns', {
	uid:{
		type: Sequelize.INTEGER,
    	primaryKey: true,
    	autoIncrement: true 
	},
	id: {
		type: Sequelize.STRING,
	},
	motivo: Sequelize.STRING,
});

console.log("Cargando comandos...");

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}


client.on('ready', () => {
  console.log("Sincronizando bases de datos...");
  warns.sync({ force: false });

  if(!mant){
	client.user.setStatus('online')
	.then(() => {
		client.user.setActivity('VALORANT', { type: 'WATCHING' })
		.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
		.catch(console.error);
	})
	.catch(console.error);

	
  }else{
	client.user.setStatus('dnd')
	.then(() => {
		client.user.setActivity('Mantenimiento', { type: 'WATCHING' })
    	.then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
    	.catch(console.error);
	})
	.catch(console.error);
  }
  
  console.log("[READY] Bot Iniciado Correctamente!");
});


client.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	
	if(reaction.message.id == "705688419757457429"){
		// Now the message has been cached and is fully available
		console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
		// The reaction is now also fully available and the properties will be reflected accurately:
		console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
		let sv = client.guilds.cache.get("665889538752643093");
		let mem = sv.members.cache.get(user.id);
		let rankedhierro = sv.roles.cache.get("704200455210663976");
		mem.roles.add(rankedhierro);
	}
});



client.on('message', message => {
  if(message.author.bot || !message.content.startsWith(prefix)) return;
  
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  if(mant){
	message.reply("bot en mantenimiento!");
	return;
  }
  
  //VARS
  let me = false;
  if(message.author.id == "329634951886536716") me = true;
  let sv = message.guild;
  let error = false;
  let msg = message.content.toUpperCase();
  let logchannel = client.channels.cache.get("702890042057687181");
  let green = 0x00ff11;
  let blue = 0x4287f5;
  let red = 0xff0000;
  let yellow = 0xffe600;
  let _PRIVILEGIES = 3;
  //❌ ✅ ℹ️
  //Admin: Mod:

  console.log(command);
  let cmd = client.commands.get(command);

  

  if (cmd.guildOnly && message.channel.type !== 'text') {
	  return message.reply(' No puedo ejecutar ese comando dentro de un MD! ❌');
  }
  
  	if(!cmd.enabled && !me){
		return message.reply(' Ese comando no está disponible actualmente! ❌');
	}




	if(me) _PRIVILEGIES = 0;

	if(message.member.roles.cache.has("665892546580316171")) _PRIVILEGIES = 2; //MOD

	if(message.member.roles.cache.has("677225447993507861")) _PRIVILEGIES = 1; //ADMIN
	
	if((command == 'mutedpug' || command == 'unmutedpug')){
		if(message.member.roles.cache.has("698157205295202424")){ 
			auth = true;
		}
	}

  if(cmd.authlevel >= _PRIVILEGIES){
	try {
		cmd.execute(message, args, warns);
	} catch (error) {
		console.error(error)

		message.reply(' ha sucedido un error y no se ha podido ejecutar el comando! Contacta con <@!329634951886536716> para reportar el fallo. ❌');
	}
  }else{
	message.reply(' no tienes permiso para ejecutar ese comando! ❌');
  }
 

});

client.login(token);
