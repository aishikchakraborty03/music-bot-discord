const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config');

// Create Discord client with necessary intents
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
    ]
});

// Initialize command collection
client.commands = new Collection();

// Load command files
const commandFiles = ['music', 'admin', 'giveaway', 'help'];
for (const file of commandFiles) {
    const commandPath = path.join(__dirname, 'commands', `${file}.js`);
    if (fs.existsSync(commandPath)) {
        const command = require(commandPath);
        if (command.commands) {
            command.commands.forEach(cmd => {
                client.commands.set(cmd.name, cmd);
                // Add aliases if they exist
                if (cmd.aliases && cmd.aliases.length > 0) {
                    cmd.aliases.forEach(alias => {
                        client.commands.set(alias, cmd);
                    });
                }
            });
        }
    }
}

// Load event files
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// Initialize music player
const { initializeMusicPlayer } = require('./utils/musicPlayer');
initializeMusicPlayer(client);

// Initialize giveaway manager
const { initializeGiveawayManager } = require('./utils/giveawayManager');
initializeGiveawayManager(client);

// Initialize dashboard
const { initializeDashboard } = require('./dashboard/server');
initializeDashboard(client);

// Login to Discord
client.login(config.BOT_TOKEN);

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Received SIGINT. Graceful shutdown...');
    client.destroy();
    process.exit(0);
});

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});
