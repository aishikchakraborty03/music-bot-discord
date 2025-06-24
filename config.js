require('dotenv').config();

module.exports = {
    BOT_TOKEN: process.env.BOT_TOKEN || 'your_bot_token_here',
    PREFIX: '!',
    EMBED_COLOR: '#7289DA',
    MUSIC_COLOR: '#FF6B6B',
    ADMIN_COLOR: '#4ECDC4',
    GIVEAWAY_COLOR: '#45B7D1',
    ERROR_COLOR: '#FF4757',
    SUCCESS_COLOR: '#26DE81',
    MAX_QUEUE_SIZE: 100,
    DEFAULT_VOLUME: 0.5,
    DASHBOARD_PASSWORD: process.env.DASHBOARD_PASSWORD || 'admin123',
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || 'your_youtube_api_key',
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || 'your_spotify_client_id',
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || 'your_spotify_client_secret',
    ADMIN_IDS: process.env.ADMIN_IDS ? process.env.ADMIN_IDS.split(',') : [],
    BOT_OWNER_ID: process.env.BOT_OWNER_ID || '1295078675347279915'
};
