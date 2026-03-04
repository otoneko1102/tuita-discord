import { Message, PartialMessage } from "discord.js";

export interface MessageUpdateEvent {
  name?: string; // コマンドではないので省略可能
  description?: string; // コマンドではないので省略可能
  include: boolean; // イベントを読み込むか (省略不可)
  execute: (
    oldMessage: Message | PartialMessage,
    newMessage: Message | PartialMessage,
  ) => void | Promise<void>;
}
