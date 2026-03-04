import "dotenv/config";

export interface Config {
  prefix: string;
  ownerId?: string;
  tag: string;
  warningMs: number;
}

const config: Config = {
  prefix: "*",
  ownerId: process.env.OWNER,
  tag: "[[tuita]]",
  warningMs: 3000,
};

export default config;
