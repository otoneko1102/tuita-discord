import consola from "consola";
import { readdirSync } from "node:fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import { Collection } from "discord.js";
import type { Command } from "./types/Command.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const commands = new Collection<string, Command>();

export async function loadCommands(): Promise<Collection<string, Command>> {
  const commandsDir = join(__dirname, "commands");

  const files = readdirSync(commandsDir).filter((f) =>
    /\.(ts|js|mjs|cjs)$/.test(f),
  );

  for (const file of files) {
    const filePath = join(commandsDir, file);
    const mod = await import(filePath);
    const command: Command = mod.default;

    if (!command || !command.include) continue;
    commands.set(command.name, command);
    consola.info(`指令読込: ${command.name}`);
  }

  return commands;
}
