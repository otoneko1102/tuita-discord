import { defineConfig } from "tsdown";
import { globSync } from "node:fs";

const entries = globSync("src/**/*.ts", { cwd: import.meta.dirname }).filter(
  (f) => !f.endsWith(".d.ts"),
);

export default defineConfig({
  entry: entries,
  exports: true,
  format: "esm",
  outDir: "dist",
  dts: false,
});
