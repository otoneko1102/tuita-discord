import "dotenv/config";

export interface Config {
  prefix: string;
  ownerId?: string;
  tag: string;
  warningMs: number;
  name: string;
  description: string;
}

const config: Config = {
  prefix: "*",
  ownerId: process.env.OWNER,
  tag: "[[tuita]]",
  warningMs: 3000,
  name: "対多",
  description: "唯一偽中国語使用可能掲示板\n🌱 草。非常愉快、爆笑投稿用\n👍 親指。良仕事、高評価投稿用\n🍬 飴。可哀想、同情、及元気譲渡用"
};

export default config;
