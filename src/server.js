const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
require('dotenv').config()

const TOKEN = process.env.TELEGRAM_TOKEN || 6000;
const url = process.env.WEBSERVICE_URL;
const port = process.env.PORT;


// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${TOKEN}`);

const app = express();


// parse the updates to JSON
app.use(express.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});

bot.onText(/\/echo (.+)/, onEchoText = (msg, match) => {
    console.log("bot.onText -> match: ", match)
    console.log("bot.onText -> msg: ", msg)
    console.log("bot.onText -> match[0]: ", match[0])
    const resp = match[1];
    bot.sendMessage(msg.chat.id, `<b>${resp}</b>, <i>${resp}</i>`, {
        parse_mode: "HTML"
    });
});

bot.onText(/\/start/, (msg) => {
    let userName = '';
    if (msg.chat.type === 'supergroup') {
        userName = msg.from.username;
    } else {
        userName = msg.chat.username;
    }
    bot.sendMessage(msg.chat.id, `<b>Welcom to Crypto Bot </b>🐳 \n\n <em>${userName}</em>`, {
        parse_mode: "HTML"
    });
});

bot.onText(/\/geteth (.+)/, getEth = (msg, match) => {
    console.log("bot.onText -> msg: ", msg)
    const resp = match[1];
    console.log("bot.on -> resp: ", resp)


    bot.sendMessage(msg.chat.id, resp, {
        "reply_markup": {
            "keyboard": [
                ["Sample text", "Second sample"],
                ["Keyboard"],
                ["I'm robot"]
            ]
        }
    });
})
