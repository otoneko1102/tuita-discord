import { Message, MessageFlags, TextChannel, ThreadChannel } from "discord.js";
import type { PartialMessage } from "discord.js";
import type { MessageUpdateEvent } from "../../types/MessageUpdateEvent.js";
import { isTuitaEnabled, isOnlyKanji } from "../../utils/tuita.js";
import config from "../../../config";

const TOPIC_TAG = config.tag;
const WARNING_MS = config.warningMs;

const handler: MessageUpdateEvent = {
  include: true,
  execute: async (
    _oldMessage: Message | PartialMessage,
    newMessage: Message | PartialMessage,
  ) => {
    if (newMessage.author?.bot) return;
    if (!newMessage.inGuild()) return;

    const channel = newMessage.channel;
    if (
      !(channel instanceof TextChannel) &&
      !(channel instanceof ThreadChannel)
    )
      return;

    if (!(await isTuitaEnabled(channel, TOPIC_TAG))) return;

    const full = newMessage.partial ? await newMessage.fetch() : newMessage;

    const content = full.content;
    const valid = content ? isOnlyKanji(content) : false;

    if (!valid) {
      try {
        await full.delete();
      } catch {}

      const warning = await full.channel.send(
        `${full.author} 警告。唯一偽中国語使用可能`,
      );
      setTimeout(() => warning.delete().catch(() => {}), WARNING_MS);
    } else {
      if (full.flags.has(MessageFlags.SuppressEmbeds)) {
        await full
          .edit({ flags: full.flags.bitfield & ~MessageFlags.SuppressEmbeds })
          .catch(() => {});
      }
      const emojis = config.emojis;
      for (const emoji of emojis) {
        await full.react(emoji).catch(() => {});
      }
    }
  },
};

export default handler;
