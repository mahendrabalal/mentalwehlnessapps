import { spawn } from "node:child_process";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = path.resolve(__dirname, "..");

const sanityPackageJson = require.resolve("sanity/package.json");
const sanityDir = path.dirname(sanityPackageJson);
const sanityBin = path.resolve(sanityDir, "bin", "sanity");

const child = spawn(
  process.execPath,
  [sanityBin, "schema", "validate"],
  {
    cwd: projectDir,
    stdio: "inherit",
    env: process.env,
  }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
