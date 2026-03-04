import type { Command } from "../types/Command";

const command: Command = {
  name: "ping",
  description: "応答確認用指令",
  include: true,
  execute: async (message) => {
    await message.reply("起動中");
  },
};

export default command;
