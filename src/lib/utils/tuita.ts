import { TextChannel, ThreadChannel, ForumChannel } from "discord.js";

// 対多が有効化を返す
export async function isTuitaEnabled(
  channel: TextChannel | ThreadChannel,
  tag: string,
): Promise<boolean> {
  if (channel instanceof TextChannel) {
    return (channel.topic ?? "").startsWith(tag);
  }

  if (
    channel instanceof ThreadChannel &&
    channel.parent instanceof ForumChannel
  ) {
    try {
      const starter = await channel.fetchStarterMessage();
      return starter?.content.startsWith(tag) ?? false;
    } catch {
      return false;
    }
  }

  return false;
}

// <@!?\d+>
export function removes(content: string): string {
  return content
    .replace(/<@!?\d+>|<@&\d+>|<#\d+>/g, "")
    .replace(/\n/g, "")
    .replace(/[　\u0020]/g, "");
}

// []() 形式のマスクリンクを検出する
export const maskedLinkRegex: RegExp = /\[([^\]]*)\]\([^)]*\)/g;

// [text](url) の url 部分を除去してテキスト部分のみ残す
export function stripMaskedLinkUrls(content: string): string {
  return content.replace(maskedLinkRegex, "$1");
}

// 漢字のUnicode範囲
export const kanjiRegex: RegExp = /[\p{Ideographic}]/u;
// 許可される記号
export const allowedSymbols: string =
  "｡､☆★♡♥%％○○□◇◆△▽▲▼■+×-÷＋╋✕－:：;；〒々〆⤴︎⤵︎←↓↑→#＃=|｜$＄¥￥＝ヶヵ々/／`ー_＿^＾*＊~〜!?！？°。、「」（）'\"@()<>【】『』［］[]“”‘’〈〉《》〔〕｛｝{}〚〛〘〙〝〟«»‹›";

export function isOnlyKanji(input: string): boolean {
  input = removes(stripMaskedLinkUrls(input));

  for (const char of input) {
    if (
      !kanjiRegex.test(char) && // 漢字でない
      !allowedSymbols.includes(char) // 許可された記号でない
    ) {
      return false;
    }
  }
  return true;
}
