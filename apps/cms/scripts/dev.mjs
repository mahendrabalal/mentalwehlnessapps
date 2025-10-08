import net from "node:net";
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

const DEFAULT_PORT = Number(
  process.env.SANITY_PORT ??
    process.env.SANITY_STUDIO_PORT ??
    process.env.PORT ??
    3334
);

async function findAvailablePort(port, attempts = 10) {
  if (attempts <= 0) {
    throw new Error("Unable to locate an available port for Sanity Studio.");
  }

  const candidatePort = Number(port);
  if (!Number.isInteger(candidatePort) || candidatePort <= 0) {
    return findAvailablePort(3333, attempts - 1);
  }

  return new Promise((resolve, reject) => {
    const tester = net.createServer();

    tester.unref();
    tester.on("error", (err) => {
      tester.close();

      if (err.code === "EADDRINUSE") {
        resolve(findAvailablePort(candidatePort + 1, attempts - 1));
        return;
      }

      reject(err);
    });

    tester.listen(candidatePort, () => {
      tester.close(() => resolve(candidatePort));
    });
  });
}

const port = await findAvailablePort(DEFAULT_PORT);

console.log(`Starting Sanity Studio on port ${port}.`);

const child = spawn(
  process.execPath,
  [sanityBin, "dev", "--port", String(port)],
  {
    cwd: projectDir,
    stdio: "inherit",
    env: {
      ...process.env,
      SANITY_STUDIO_PORT: String(port),
      PORT: String(port),
    },
  }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});
