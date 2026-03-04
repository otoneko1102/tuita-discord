import consola from "consola";
import { readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import type { Client } from "discord.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function loadEvents(client: Client): Promise<void> {
  const eventsDir = join(__dirname, "events");

  const eventDirs = readdirSync(eventsDir).filter((d) =>
    statSync(join(eventsDir, d)).isDirectory(),
  );

  for (const dirName of eventDirs) {
    // 正規化
    const discordEvent = dirName.charAt(0).toLowerCase() + dirName.slice(1);
    const eventDir = join(eventsDir, dirName);

    const files = readdirSync(eventDir).filter((f) =>
      /\.(ts|js|mjs|cjs)$/.test(f),
    );

    for (const file of files) {
      const mod = await import(join(eventDir, file));
      const handler = mod.default;

      if (!handler || !handler.include) continue;

      client.on(discordEvent, async (...args: unknown[]) => {
        try {
          await handler.execute(...args);
        } catch (error) {
          consola.error(`[${dirName}/${file}] 不具合:`, error);
        }
      });

      consola.info(`出来事読込: ${dirName}/${file}`);
    }
  }
}
