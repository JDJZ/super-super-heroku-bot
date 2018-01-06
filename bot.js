const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

var prefix = config.prefix;

var servers = {};

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping') {
    	message.reply('pong');
  	}
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'logs');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
  client.user.setPresence({ game: { name: config.prefix + "help | " + client.users.size + " users", type: 0 } });
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'logs');
  if (!channel) return;
  channel.send(`${member} left the server. :sob:`);
  client.user.setPresence({ game: { name: config.prefix + "help | " + client.users.size + " users", type: 0 } });
});

client.on('message', message => {
  if(message.author.bot) return;
  if(!message.content.startsWith(config.prefix)) return;

  var args = message.content.substring(config.prefix.length).split(" ");

  switch (args[0].toLowerCase()) {
  case "play":
    message.delete();
    if (!args[1]) {
      message.channel.send("Please provide a link.");
      return;
    }

    if(!message.member.voiceChannel){
      message.channel.send("You must be in a voice channel.");
      return;
    }

    if(!servers[message.guild.id]) servers[message.guild.id] = {
      queue: []

    }

    var server = servers[message.guild.id];

    server.queue.push(args[1]);


    if(!message.guild.voiceChannel) message.member.voiceChannel.join().then(function(connection) {
      play(connection, message)
    });

  break;

  case "help":
    message.delete();
    message.author.send({ embed } );

  break;

  case "invite":
  message.delete();
  message.channel.send("I am sorry, I can not join invite links. You must add me to your server. Add me here: https://goo.gl/fzJXxJ")
  break;

  case "ping":
  message.delete();
  message.channel.send(':ping_pong: pong').then( m => m.delete(7000));
  break;

  case "clear":
  message.delete();
    var server = servers[message.guild.id];

    if(messgae.guild.voiceConnection) message.guild.voiceConnection.disconnect();
  break;


}

});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
