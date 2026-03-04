import { Message } from "discord.js";

export interface Command {
  name: string;
  description: string;
  include: boolean; // コマンドを読み込むか (省略不可)
  execute: (message: Message, args: string[]) => void | Promise<void>;
}
