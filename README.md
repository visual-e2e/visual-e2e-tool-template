# __TOOL_NAME__

Visual E2E 工具：`__TOOL_ID__`。

由 `vet init tool` 从 [visual-e2e-tool-template](https://github.com/visual-e2e/visual-e2e-tool-template) 生成。

## 开发

```bash
npm install
npm run dev
```

- API: http://127.0.0.1:__DEV_PORT__
- Web: http://127.0.0.1:__WEB_DEV_PORT__

## 打包

```bash
npm run build
npm run pack
```

产出 `dist/__TOOL_ID__-__TOOL_VERSION__.vettool.zip`（生产产物，无源码 / 无 node_modules）。

在 Visual E2E Test 工具箱中「安装工具包」。
