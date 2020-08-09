module.exports = {
	name: 'unmutedchat',
	description: 'desmutea a una persona de los canales de texto',
  guildOnly: true,
  enabled: true,
  authlevel: 2,
	execute(message) {

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
      const warnmsg = {
	      color: green,
	      title: 'Atención',
	      description: 'Has sido desmuteado de los canales de texto.',
	      timestamp: new Date(),
	      footer:{
		 text: 'Valorant Bot',
	      },
      };
      let rol = sv.roles.cache.get("702892249062703194");
      
      const logembed = {
        color: yellow,
        title: 'Chat Unmute',
        author: {
          name: usr.username,
          icon_url: usr.avatarURL()
        },
        fields: [
          {
            name: 'Usuario desmuteado',
            value: usr,
          },
          {
            name: 'Desmuteado por',
            value: message.author,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: 'Valorant Bot',
        },
      };
      message.react('✅').catch(console.error);
      member.roles.remove(rol)
      usr.send({embed:warnmsg});
      logchannel.send({embed:logembed}).catch(console.error);
    }else{
      const infoembed = {
        color: blue,
        title: 'ℹ️ Uso del comando',
        description: '!unmutedchat ``<@usuario>``',
        timestamp: new Date(),
        footer: {
          text: 'Valorant Bot',
        },
      };
      message.channel.send({embed:infoembed})
    }
	},
};
