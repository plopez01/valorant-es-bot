const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
    description: 'Informacion sobre los comandos',
    guildOnly: false,
    enabled: true,
    
	execute(message, args) {
		const data = [];
        const { commands } = message.client;
        console.log(commands.map(command => command.enabled));
        let commandsNames = commands.map(command => command.name);
        let enabledCommands = commands.map(command => command.enabled);
        
        let filteredCommands = [];
        for(let x = 0; x < commandsNames.length; x++){
            if(enabledCommands[x]){
                filteredCommands.push(commandsNames[x]);
            }
        }


        if (!args.length) {
            data.push('Lista con todos los comandos:');
            data.push(filteredCommands.join(', '));
            data.push(`\nPuedes usar \`${prefix}help [comando]\` para obtener información especifica de un comando!`);

            return message.author.send(data, { split: true })
	            .then(() => {
		            if (message.channel.type === 'dm') return;
		            message.reply('Te he enviado un mensaje privado con todos mis comandos!');
	            })
	            .catch(error => {
		        console.error(`No se ha podido enviar MD a ${message.author.tag}.\n`, error);
		        message.reply('parece que no te puedo enviar un MD, no los tienes desactivados?');
	            });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('ese comando no es válido!');
        }

        data.push(`**Nombre:** ${command.name}`);

        //if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Descripción:** ${command.description}`);
        //if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        //data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        message.channel.send(data, { split: true });

	},
};