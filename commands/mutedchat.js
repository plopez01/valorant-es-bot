module.exports = {
	name: 'mutedchat',
	description: 'mutea a una persona de los canales de texto',
  guildOnly: true,
  enabled: true,
  authlevel: 2,
	execute(message, args) {

    let sv = message.guild;
    let error = false;
    let msg = message.content.toUpperCase();
    let logchannel = sv.channels.cache.get("702890042057687181");


    let green = 0x00ff11;
    let blue = 0x4287f5;
    let red = 0xff0000;
    let yellow = 0xffe600;
		let usr = message.mentions.users.first();
    if(usr != null){
      let member = sv.member(usr);
      let motivo;
      if(args.length > 1){
        motivo = args[1] + " ";
        for(let x = 2; x < args.length; x++){
          motivo += args[x] + " ";
        }
      }else{
        motivo = "No se ha proporcionado un motivo";
      }

      
      let rol = sv.roles.cache.get("702892249062703194");
     
      const warnmsg = {
	      color: yellow,
	      title: 'Atención',
	      description: 'Has sido muteado por el mal uso de los canales de texto. Pon un tiquet para reclamar en <#703958300219146250>',
	      timestamp: new Date(),
	      footer:{
		 text: 'Valorant Bot',
	      },
      };
      
      
      const logembed = {
        color: yellow,
        title: 'Chat Mute',
        author: {
          name: usr.username,
          icon_url: usr.avatarURL()
        },
        fields: [
          {
            name: 'Motivo',
            value: motivo,
          },
          {
            name: 'Usuario muteado',
            value: usr,
          },
          {
            name: 'Muteado por',
            value: message.author,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: 'Valorant Bot',
        },
      };
      message.react('✅').catch(console.error);
      member.roles.add(rol)
      usr.send({embed:warnmsg});
      logchannel.send({embed:logembed});
    }else{
      const infoembed = {
        color: blue,
        title: 'ℹ️ Uso del comando',
        description: '!mutedchat ``<@usuario>`` ``[motivo]``',
        timestamp: new Date(),
        footer: {
          text: 'Valorant Bot',
        },
      };
      message.channel.send({embed:infoembed})
    }
	},
};
