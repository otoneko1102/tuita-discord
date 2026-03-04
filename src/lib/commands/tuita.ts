import {
  Message,
  PermissionFlagsBits,
  TextChannel,
  ForumChannel,
} from "discord.js";
import type { Command } from "../types/Command.js";
import config from "../../config";

const TOPIC_TAG = config.tag;

async function replyTemp(message: Message, text: string, ms = 5000) {
  const m = await message.reply(text);
  setTimeout(() => m.delete().catch(() => {}), ms);
}

const command: Command = {
  name: "tuita",
  description: `機能 有効化・無効化 [対象指定可能]`,
  include: true,
  execute: async (message, args) => {
    if (!message.inGuild()) return;

    const member = message.member;
    if (
      !member?.permissions.has(PermissionFlagsBits.ManageChannels) &&
      config?.ownerId &&
      member?.id !== config.ownerId
    ) {
      await replyTemp(message, "権限不足");
      return;
    }

    // args からチャンネルを解決（メンション <#ID> or 生 ID）
    let targetChannel: TextChannel | ForumChannel | null = null;

    if (args.length > 0) {
      const raw = args[0];
      const channelId = raw.replace(/^<#(\d+)>$/, "$1");
      const fetched = message.guild?.channels.cache.get(channelId);

      if (!fetched) {
        await replyTemp(message, "未発見");
        return;
      }

      if (fetched instanceof TextChannel) {
        targetChannel = fetched;
      } else if (fetched instanceof ForumChannel) {
        targetChannel = fetched;
      } else {
        await replyTemp(message, "指令不可");
        return;
      }
    }

    // フォーラム
    if (targetChannel instanceof ForumChannel) {
      const newThread = await targetChannel.threads.create({
        name: config.name,
        message: { content: `${TOPIC_TAG}\n${config.description}` },
      });
      const reply = await message.reply(`作成: ${newThread}`);
      setTimeout(() => reply.delete().catch(() => {}), 5000);
      return;
    }

    // テキストチャンネル
    const textChannel =
      targetChannel ??
      (message.channel instanceof TextChannel ? message.channel : null);

    if (!textChannel) {
      await replyTemp(message, "指令不可");
      return;
    }

    const currentTopic = textChannel.topic ?? "";
    let newTopic: string;
    let toggled: boolean;

    if (currentTopic.startsWith(TOPIC_TAG)) {
      newTopic = currentTopic.slice(TOPIC_TAG.length).trimStart();
      toggled = false;
    } else {
      newTopic = `${TOPIC_TAG} ${currentTopic}`.trim();
      toggled = true;
    }

    await textChannel.setTopic(newTopic);
    const state = toggled ? "有効化" : "無効化";
    const reply = await message.reply(
      `対多 **${state}**${targetChannel ? ` (${textChannel})` : ""}`,
    );
    setTimeout(() => reply.delete().catch(() => {}), 5000);
  },
};

export default command;
