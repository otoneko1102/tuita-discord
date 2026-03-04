import { Message } from "discord.js";

export interface MessageCreateEvent {
  name?: string; // コマンドではないので省略可能
  description?: string; // コマンドではないので省略可能
  include: boolean; // イベントを読み込むか (省略不可)
  execute: (message: Message) => void | Promise<void>;
}
