module.exports = {
	name: 'warn',
	description: 'Añade un aviso a la persona mencionada con un motivo',
    guildOnly: true,
    enabled: true,
    authlevel: 2,
	execute(message, args, warns) {

    let sv = message.guild;
    let error = false;
    let msg = message.content.toUpperCase();
    let logchannel = sv.channels.cache.get("704102307352150026");


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

      
     
      const warnmsg = {
	      color: yellow,
	      title: 'Atención',
	      description: 'Has sido warneado por infringir la normativa del servidor. Para reclamar pon un tiquet en <#703958300219146250>',
	      timestamp: new Date(),
	      footer:{
		 text: 'Valorant Bot',
	      },
      };
      
      
      const logembed = {
        color: yellow,
        title: 'Warn',
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
            name: 'Usuario warneado',
            value: usr,
          },
          {
            name: 'Warneado por',
            value: message.author,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: 'Valorant Bot',
        },
      };
      
      try {
        const warn = warns.create({
            id: usr.id,
            motivo: motivo
        }).then(() => {
          warns.findAll({
            where: {
              id: member.id
            }
          }).then(result => {
            if(result.length > 0){
              let warnlist = [];
              for(let x = 0; x < result.length; x++){
                warnlist.push({name: 'Warn '+x+" ("+result[x].dataValues.uid+'):', value:result[x].dataValues.motivo});
              }
              response = {
                color: green,
                title: 'Warn Añadido',
                description: "**Motivo: "+motivo+"**",
                author: {
                  name: usr.username,
                  icon_url: usr.avatarURL()
                },
                fields: warnlist,
                timestamp: new Date(),
                footer: {
                  text: 'Valorant Bot',
                },
              };
            }else{
              response = {
                color: yellow,
                title: ':warning:  Este usuario no tiene ningún warning!',
              };
            }
            
           message.channel.send({embed: response});
          }).catch(console.error);
          
        });
        
    }
    catch (e) {
        return message.reply('Ha ocurrido un error intentando añadir el warn.');
    }
      usr.send({embed:warnmsg});
      logchannel.send({embed:logembed});
    }else{
      const infoembed = {
        color: blue,
        title: 'ℹ️ Uso del comando',
        description: '!warn ``<@usuario>`` ``[motivo]``',
        timestamp: new Date(),
        footer: {
          text: 'Valorant Bot',
        },
      };
      message.channel.send({embed:infoembed})
    }
	},
};
