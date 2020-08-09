module.exports = {
	name: 'reload',
	description: 'Recarga un comando',
	enabled: false,
	authlevel: 0,
	execute(message, args) {
		if(message.author.id != "329634951886536716"){
			message.reply(" no tienes autorización para recargar un comando");
			return;
		}
		if(args.length <= 0){
			message.channel.send("Especifica un comando");
			return;
		}
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`No se ha encontrado un comando con el nombre \`${commandName}\`, ${message.author}!`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Se ha recargado el comando \`${command.name}\``);
		} catch (error) {
			console.log(error);
			message.channel.send(`Ha ocurrido un error recargando el comando \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};
