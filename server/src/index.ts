import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const port = Number(process.env.TOOL_PORT ?? "__DEV_PORT__");
const host = "127.0.0.1";
const serveWeb = process.env.SERVE_WEB === "1";
const toolId = process.env.TOOL_ID ?? "__TOOL_ID__";

const app = Fastify({ logger: true });
await app.register(cors, { origin: true });

app.get("/api/health", async () => ({
  ok: true,
  toolId,
  name: "__TOOL_NAME__",
  version: "__TOOL_VERSION__",
  port,
}));

app.get("/api/info", async () => ({
  id: toolId,
  name: "__TOOL_NAME__",
  description: "__TOOL_DESCRIPTION__",
  version: "__TOOL_VERSION__",
}));

if (serveWeb) {
  const webRoot = join(dirname(fileURLToPath(import.meta.url)), "../../web/dist");
  if (existsSync(webRoot)) {
    await app.register(fastifyStatic, { root: webRoot, prefix: "/" });
    app.setNotFoundHandler((req, reply) => {
      if (req.url.startsWith("/api")) return reply.code(404).send({ error: "Not found" });
      return reply.sendFile("index.html", webRoot);
    });
  }
}

await app.listen({ port, host });
console.log(`[${toolId}] http://${host}:${port}`);
