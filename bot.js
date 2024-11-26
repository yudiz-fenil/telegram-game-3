const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const bodyParser = require('body-parser');

const token = '7772255342:AAHth65BzyCrKrjLEno2Am0zAGrHfYDvfzo';
const GAME_URL = 'https://game.yudiz.com/swift-ball/';

const bot = new Telegraf(token);
const app = express();
const port = 3023;

app.use(bodyParser.json());

// Handle /start command with referral
bot.command('start', async (ctx) => {
  try {
    // Get the referral code from the start command if it exists
    const startPayload = ctx.message.text.split(' ')[1];

    // Construct the game URL with the referral code using the new format
    const gameUrl = startPayload
      ? `${GAME_URL}?tgWebAppStartParam=${startPayload}`
      : GAME_URL;

    await ctx.replyWithMarkdown(
      `*Swift Ball*\n\n` +
      `⚡ Control the ball with quick reactions!\n` +
      `🎮 Avoid obstacles with precise moves.\n` +
      `🏆 Test your speed and set new records!\n` +
      `🌟 Fast, fun, and endlessly challenging.\n` +
      `🚀 How long can you keep the ball safe?`,
      Markup.inlineKeyboard([
        Markup.button.webApp('START', gameUrl)
      ])
    );
  } catch (error) {
    console.error('Error in start command:', error);
    ctx.reply('Sorry, something went wrong. Please try again.');
  }
});

// Webhook route for Telegram
app.post(`/bot${token}`, (req, res) => {
  bot.handleUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Set up webhook
const url = 'https://game.webdevprojects.cloud/telegram-game-3/bot' + token;
bot.telegram.setWebhook(url);