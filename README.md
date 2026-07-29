# Demo

Visual E2E 工具：`demo`。

由 `vet init tool` 从 [visual-e2e-tool-template](https://github.com/visual-e2e/visual-e2e-tool-template) 生成。

## 开发

在 Visual E2E Test **应用中心** 中通过 **开发小工具** 关联本目录后，按主应用提示填入 `E2E_ROOT` 再启动：

```bash
npm install

# 源码主应用：仓库根；安装版：…/Visual E2E Test.app/Contents/Resources/app
export E2E_ROOT="/path/to/visual-e2e-test"
export E2E_RUNTIME=client

npm run dev
```

关联后从应用中心「开发小工具」打开；需先在主应用「浏览器环境」配置 Chromium。

## RPC（iframe）

工具 web 在应用内 iframe 中运行时，通过 `@visual-e2e/rpc-sdk` 与主应用通信：

```ts
import { getRpcClient, isEmbedded } from "@visual-e2e/rpc-sdk";

if (isEmbedded()) {
  const ctx = await getRpcClient().getProjectContext();
  // ctx.base_url, ctx.username, ctx.password
}
```

在 `tool.json` 中声明 `rpc.protocolVersion` 与所需 `capabilities`（如 `project.context`）。协议与类型见 [`visual-e2e-rpc`](https://github.com/visual-e2e/visual-e2e-rpc)。

包未发布前本地 typecheck 可临时将依赖改为 `file:../visual-e2e-rpc/packages/rpc-sdk`。

## 打包

```bash
npm run build
npm run pack
```

产出 `dist/demo-0.1.0.vettool.zip`（生产产物，无源码 / 无 node_modules）。

在 Visual E2E Test 应用中心中「安装工具包」。
