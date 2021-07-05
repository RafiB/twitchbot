const twitch_messaging_interface = require('tmi.js');
const handleCommand = require('./handleCommand.js')

const options = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

// Create a client with our options
const client = new twitch_messaging_interface.client(options);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  // Ignore messages from the bot
  if (self) {
    return;
  }

  // Remove whitespace from chat message
  const command = msg.trim();

  handleCommand(client, target, command);
}
