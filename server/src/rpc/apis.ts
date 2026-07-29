import { createRpcClient } from "./client.js";

export async function listCapabilities(traceId: string) {
  const client = createRpcClient();
  return client.listToolCapabilities({ traceId });
}
