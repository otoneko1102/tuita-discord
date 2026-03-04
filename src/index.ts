import "dotenv/config";
import consola from "consola";

import { Client, GatewayIntentBits, Events, Message } from "discord.js";
import config from "./config.js";
import { loadCommands } from "./lib/handler.js";
import { loadEvents } from "./lib/eventLoader.js";

const token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error("環境変数未設定");
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

async function main() {
  const commands = await loadCommands();
  await loadEvents(client);

  client.once(Events.ClientReady, (c) => {
    consola.success(`起動完了: ${c.user.tag}`);
  });

  client.on(Events.MessageCreate, async (message: Message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content
      .slice(config.prefix.length)
      .trim()
      .split(/\s+/);
    const commandName = args.shift()?.toLowerCase();
    if (!commandName) return;

    const command = commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args);
    } catch (error) {
      consola.error(error);
      message.reply("指令中不具合発生");
    }
  });

  client.login(token);
}

main();
