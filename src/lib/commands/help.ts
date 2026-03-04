import { EmbedBuilder } from "discord.js";
import type { Command } from "../types/Command.js";
import { commands } from "../handler.js";
import config from "../../config.js";

const command: Command = {
  name: "help",
  description: "全指令一覧表示。引数有時詳細表示",
  include: true,
  execute: async (message, args) => {
    // 特定コマンドの詳細
    if (args.length > 0) {
      const target = commands.get(args[0].toLowerCase());
      if (!target) {
        const m = await message.reply(`指令「${args[0]}」未存在`);
        setTimeout(() => m.delete().catch(() => {}), 5000);
        return;
      }

      const embed = new EmbedBuilder()
        .setTitle(`指令：${config.prefix}${target.name}`)
        .setDescription(target.description)
        .setColor(0x5865f2);

      await message.reply({ embeds: [embed] });
      return;
    }

    // 全コマンド一覧
    const embed = new EmbedBuilder()
      .setTitle("指令一覧")
      .setDescription(
        commands
          .map((cmd) => `\`${config.prefix}${cmd.name}\` — ${cmd.description}`)
          .join("\n"),
      )
      .setFooter({ text: `詳細：${config.prefix}help <指令名>` })
      .setColor(0x5865f2);

    await message.reply({ embeds: [embed] });
  },
};

export default command;
