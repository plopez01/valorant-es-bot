module.exports = {
	name: 'warns',
	description: 'Muestra los warns que tiene un usuario.',
    guildOnly: true,
    enabled: true,
    authlevel: 2,
	execute(message, args, warns) {

    let sv = message.guild;
    let error = false;
    let msg = message.content.toUpperCase();

    let green = 0x00ff11;
    let blue = 0x4287f5;
    let red = 0xff0000;
    let yellow = 0xffe600;
    
	let usr = message.mentions.users.first();
    if(usr != null){
      let member = sv.member(usr);
      let response = {
        color: red,
        title: 'Error ❌',
        description: 'Se ha producido un error',
        timestamp: new Date(),
        footer: {
          text: 'Valorant Bot',
        },
      };
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
            color: blue,
            title: 'Warns',
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

     
    }else{
      const infoembed = {
        color: blue,
        title: 'ℹ️ Uso del comando',
        description: '!warns ``<@usuario>``',
        timestamp: new Date(),
        footer: {
          text: 'Valorant Bot',
        },
      };
      message.channel.send({embed:infoembed})
    }
	},
};
