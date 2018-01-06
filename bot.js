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

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
