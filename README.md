# __TOOL_NAME__

Visual E2E 工具：`__TOOL_ID__`。

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

模板已集成 `@visual-e2e/rpc-sdk`。从应用内打开工具时，主应用会注入 RPC 相关环境（如 endpoint、token），`npm run dev` 启动后即可按业务代码调用主平台 RPC。

RPC 封装位于 `server/src/rpc/`（`client` / `apis` / `errors`），可在服务端业务逻辑中直接复用。

## 打包

```bash
npm run build
npm run pack
```

产出 `dist/__TOOL_ID__-__TOOL_VERSION__.vettool.zip`（生产产物，无源码 / 无 node_modules）。

在 Visual E2E Test 应用中心中「安装工具包」。
