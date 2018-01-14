const Discord = require('discord.js');
const client = new Discord.Client();
const books = require('google-books-search');

// your token:
var token = 'token';
// command prefix:
var prefix = "!";
// results count limit (max 25)
var limit = 5;
// end of settings

function search(title, message) {
  books.search(title, {limit: limit}, function(error, results) {
    if (error) { message.author.send('Error...')}
    else {
    const embed = new Discord.RichEmbed() // creates embed
    .setDescription("Search results for: "+title)
    .setColor(0x1c1717);
    for (i in results) { // loops over results
      embed.addField('Title: '+results[i].title, 'Author(s): '+results[i].authors+'\nLink: '+results[i].link);
    }
    message.author.send(embed); // sends embed with results to user
  }
  });
}
client.on('ready', function() {
  console.log('Ready');
  client.user.setGame('!book title'); // set bot game to "!book title"
});
client.on('message', function(message) {
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase(); // cut command and args
  if(command === "book"){
    let text = args.slice().join(" ");
    search(text, message);
  }
})

client.login(token);
