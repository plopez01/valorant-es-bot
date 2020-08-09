const { Op } = require("sequelize");

module.exports = {
	name: 'unwarn',
	description: 'Elimina un warn',
    guildOnly: true,
    enabled: true,
    authlevel: 1,
	execute(message, args, warns) {

    let sv = message.guild;
    let error = false;
    let msg = message.content.toUpperCase();
    let logchannel = sv.channels.cache.get("704102307352150026");
    let response;
    let green = 0x00ff11;
    let blue = 0x4287f5;
    let red = 0xff0000;
    let yellow = 0xffe600;
    
	let usr = message.mentions.users.first();
    if(usr != null){
      let member = sv.member(usr);

      if(isNaN(args[1]) || args[1] < 0 || args[1] == undefined){
        let err = {
          color: red,
          title: '❌ ID no válida!',
        };
        message.channel.send({embed: err}).catch(console.error);
        return;
      }
      
      const logembed = {
        color: red,
        title: 'Unwarn',
        author: {
          name: usr.username,
          icon_url: usr.avatarURL()
        },
        fields: [
          {
            name: 'Usuario unwarneado',
            value: usr,
          },
          {
            name: 'Unwarneado por',
            value: message.author,
          },
        ],
        timestamp: new Date(),
        footer: {
          text: 'Valorant Bot',
        },
      };
      
      try {
          warns.findAll({
            where: {
              id: member.id
            }
          }).then(result => {
            if(result.length > 0){
              let validuid = false;
              for(let x = 0; x < result.length; x++){
                if(result[x].dataValues.uid == args[1]){
                  validuid = true;
                }
              }
              if(!validuid){
                let err = {
                  color: red,
                  title: '❌ ID no válida!',
                };
                message.channel.send({embed: err}).catch(console.error);
                return;
              }
              warns.destroy({ where: {[Op.and]: [
                { uid: args[1] },
                { id: member.id }
              ]} }).then(() => {
               
                let warnlist = [];
                for(let x = 0; x < result.length; x++){
                  warnlist.push({name: 'Warn '+x+" ("+result[x].dataValues.uid+'):', value:result[x].dataValues.motivo});
                }
                response = {
                  color: red,
                  title: 'Warn Eliminado',
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
                message.channel.send({embed: response});
                logchannel.send({embed:logembed});
              })
             
            }else{
              response = {
                color: yellow,
                title: ':warning:  Este usuario no tiene ningún warning!',
              };
              message.channel.send({embed: response});
            }
            
           
           
          }).catch(console.error);

        
    }
    catch (e) {
        return message.reply('Ha ocurrido un error intentando añadir el warn.');
    }

   
      
    }else{
      const infoembed = {
        color: blue,
        title: 'ℹ️ Uso del comando',
        description: '!warn ``<@usuario>`` ``<id del warn>``',
        timestamp: new Date(),
        footer: {
          text: 'Valorant Bot',
        },
      };
      message.channel.send({embed:infoembed})
    }
	},
};
