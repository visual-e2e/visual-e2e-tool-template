import { useEffect, useState } from "react";
import { getRpcClient, isEmbedded } from "@visual-e2e/rpc-sdk";

type RpcAction = {
  id: string;
  label: string;
  method: string;
  capability: string;
  run: () => Promise<unknown>;
};

const RPC_ACTIONS: RpcAction[] = [
  {
    id: "getProjectContext",
    label: "getProjectContext()",
    method: "project.getContext",
    capability: "project.context",
    run: () => getRpcClient().getProjectContext(),
  },
  {
    id: "listProjects",
    label: "listProjects()",
    method: "project.list",
    capability: "project.list",
    run: () => getRpcClient().listProjects(),
  },
  {
    id: "getProjectVariables",
    label: "getProjectVariables()",
    method: "project.getVariables",
    capability: "project.variables",
    run: () => getRpcClient().getProjectVariables(),
  },
  {
    id: "getSettings",
    label: "getSettings()",
    method: "config.getSettings",
    capability: "config.settings",
    run: () => getRpcClient().getSettings(),
  },
  {
    id: "getBrowserRuntime",
    label: "getBrowserRuntime()",
    method: "config.getBrowserRuntime",
    capability: "config.browserRuntime",
    run: () => getRpcClient().getBrowserRuntime(),
  },
  {
    id: "pickFolder",
    label: "pickFolder()",
    method: "fs.pickFolder",
    capability: "fs.pickFolder",
    run: () => getRpcClient().pickFolder(),
  },
  {
    id: "getDataDir",
    label: "getDataDir()",
    method: "fs.getDataDir",
    capability: "fs.dataDir",
    run: () => getRpcClient().getDataDir(),
  },
  {
    id: "navigateScenario",
    label: "navigateScenario()",
    method: "scenario.navigate",
    capability: "scenario.navigate",
    run: () => getRpcClient().navigateScenario("demo", "sample"),
  },
  {
    id: "cacheClear",
    label: "cacheClear()",
    method: "cache.clear",
    capability: "cache.clear",
    run: () => getRpcClient().cacheClear(),
  },
];

const DEFAULT_ACTION = RPC_ACTIONS[0];

export function App() {
  const embedded = isEmbedded();
  const [activeId, setActiveId] = useState(DEFAULT_ACTION.id);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [called, setCalled] = useState(false);

  const active = RPC_ACTIONS.find((a) => a.id === activeId) ?? DEFAULT_ACTION;

  async function runAction(action: RpcAction) {
    setActiveId(action.id);
    setLoading(true);
    setError(null);
    setResult(null);
    setCalled(true);
    try {
      if (!isEmbedded()) {
        throw new Error("请在应用中心 iframe 内打开本工具后再调用 RPC");
      }
      const data = await action.run();
      setResult(data === undefined ? { ok: true } : data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void runAction(DEFAULT_ACTION);
  }, []);

  return (
    <main className="page">
      <header className="page__header">
        <h1>__TOOL_NAME__</h1>
        <p className="desc">__TOOL_DESCRIPTION__</p>
        {!embedded && (
          <p className="warn">当前未嵌入 Host iframe，RPC 调用会失败；请从应用中心打开。</p>
        )}
      </header>

      <div className="layout">
        <nav className="rpc-menu" aria-label="RPC API">
          <div className="rpc-menu__title">RPC API</div>
          <ul className="rpc-menu__list">
            {RPC_ACTIONS.map((action) => (
              <li key={action.id}>
                <button
                  type="button"
                  className={
                    activeId === action.id ? "rpc-menu__item is-active" : "rpc-menu__item"
                  }
                  disabled={loading && activeId === action.id}
                  onClick={() => void runAction(action)}
                >
                  <span className="rpc-menu__label">{action.label}</span>
                  <span className="rpc-menu__meta">{action.method}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section className="rpc-result">
          <h2>返回结果</h2>
          <p className="rpc-result__head">
            {active.label}
            {loading ? " · 请求中…" : ""}
          </p>
          {!called && !loading && <p className="muted">尚未调用</p>}
          {error && <pre className="rpc-result__error">{error}</pre>}
          {!error && result !== null && (
            <pre className="rpc-result__json">{JSON.stringify(result, null, 2)}</pre>
          )}
        </section>
      </div>
    </main>
  );
}
