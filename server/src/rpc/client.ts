import { createClient } from "@visual-e2e/rpc-sdk";

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function createRpcClient() {
  return createClient({
    baseUrl: requiredEnv("VISUAL_E2E_RPC_BASE_URL"),
    token: process.env.VISUAL_E2E_RPC_TOKEN,
    userAgent: process.env.VISUAL_E2E_RPC_USER_AGENT ?? "__TOOL_ID__/rpc-client"
  });
}
