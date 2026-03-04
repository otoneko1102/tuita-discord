import { Message, TextChannel, ThreadChannel } from "discord.js";
import type { MessageCreateEvent } from "../../types/MessageCreateEvent.js";
import { isTuitaEnabled, isOnlyKanji } from "../../utils/tuita.js";
import config from "../../../config";

const TOPIC_TAG = config.tag;
const WARNING_MS = config.warningMs;

const handler: MessageCreateEvent = {
  include: true,
  execute: async (message: Message) => {
    if (message.author.bot) return;
    if (!message.inGuild()) return;

    const channel = message.channel;
    if (
      !(channel instanceof TextChannel) &&
      !(channel instanceof ThreadChannel)
    )
      return;

    if (!(await isTuitaEnabled(channel, TOPIC_TAG))) return;

    const content = message.content;
    const valid = content ? isOnlyKanji(content) : false;

    if (!valid) {
      try {
        await message.delete();
      } catch {}

      const warning = await message.channel.send(
        `${message.author} 警告。唯一偽中国語使用可能`,
      );
      setTimeout(() => warning.delete().catch(() => {}), WARNING_MS);
    } else {
      const emojis = config.emojis;
      for (const emoji of emojis) {
        await message.react(emoji).catch(() => {});
      }
    }
  },
};

export default handler;
