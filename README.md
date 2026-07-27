# __TOOL_NAME__

Visual E2E 工具：`__TOOL_ID__`。

由 `vet init tool` 从 [visual-e2e-tool-template](https://github.com/visual-e2e/visual-e2e-tool-template) 生成。

## 开发

在 Visual E2E Test 应用 工具箱中 **开发小工具** 关联本目录后，按主应用提示填入 `E2E_ROOT` 再启动：

```bash
npm install

# 源码主应用：仓库根；安装版：…/Visual E2E Test.app/Contents/Resources/app
export E2E_ROOT="/path/to/visual-e2e-test"
export E2E_RUNTIME=client

npm run dev
```

- API: http://127.0.0.1:__DEV_PORT__
- Web: http://127.0.0.1:__WEB_DEV_PORT__

关联后从工具箱「开发小工具」打开；需先在主应用「浏览器环境」配置 Chromium。

## 打包

```bash
npm run build
npm run pack
```

产出 `dist/__TOOL_ID__-__TOOL_VERSION__.vettool.zip`（生产产物，无源码 / 无 node_modules）。

在 Visual E2E Test 工具箱中「安装工具包」。
