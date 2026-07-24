import { useEffect, useState } from "react";

interface Health {
  ok: boolean;
  toolId: string;
  name?: string;
  version?: string;
}

export function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/health");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Health;
        if (!cancelled) setHealth(data);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "加载失败");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="page">
      <h1>__TOOL_NAME__</h1>
      <p className="desc">__TOOL_DESCRIPTION__</p>
      {error && <p className="error">{error}</p>}
      {health && (
        <dl className="meta">
          <div>
            <dt>id</dt>
            <dd>{health.toolId}</dd>
          </div>
          <div>
            <dt>version</dt>
            <dd>v{health.version ?? "__TOOL_VERSION__"}</dd>
          </div>
        </dl>
      )}
      {!health && !error && <p className="muted">Connecting…</p>}
    </main>
  );
}
