require('dotenv').config()

const { Client, Collection, WebhookClient } = require('discord.js')

const { token, webhook } = require('./config.json')

const bot = new Client({
  autoReconnect: true,
})

// -------------------- Webhooks --------------------

const logsWebhook = new WebhookClient(webhook.id, webhook.token)

// -------------------- Commands/Events handling --------------------

const cmds = ['aliases', 'commands']
const handlers = ['command', 'event']

cmds.forEach((x) => (bot[x] = new Collection()))
handlers.forEach((x) => require(`./handlers/${x}`)(bot, logsWebhook))

// -------------------- Login --------------------

bot.login(token)
