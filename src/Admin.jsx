import { useEffect, useState } from "react";

function formatJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export default function Admin() {
  const [authState, setAuthState] = useState("checking");
  const [password, setPassword] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [commitMessage, setCommitMessage] = useState("Update portfolio content");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [repoInfo, setRepoInfo] = useState(null);
  const [lastCommit, setLastCommit] = useState(null);

  async function loadCurrentData() {
    setLoadingData(true);
    setError("");
    try {
      const response = await fetch("/data.json", { cache: "no-store" });
      if (!response.ok) throw new Error("Could not load current portfolio data");
      const data = await response.json();
      setEditorValue(formatJson(data));
      setStatus("Loaded the latest deployed portfolio data.");
    } catch (loadError) {
      setError(loadError.message || "Could not load data");
    } finally {
      setLoadingData(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function bootstrap() {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" });
        const data = await response.json();
        if (ignore) return;
        setRepoInfo(data.repo || null);
        setAuthState(data.authenticated ? "authenticated" : "guest");
      } catch {
        if (!ignore) {
          setAuthState("guest");
          setError("Could not check admin session.");
        }
      }

      if (!ignore) {
        await loadCurrentData();
      }
    }

    bootstrap();
    return () => {
      ignore = true;
    };
  }, []);

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setStatus("Signing in...");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      setAuthState("authenticated");
      setPassword("");
      setStatus("Signed in. You can edit and save to GitHub now.");
    } catch (loginError) {
      setError(loginError.message || "Login failed");
      setStatus("");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthState("guest");
    setStatus("Signed out.");
  }

  function handleFormat() {
    try {
      setEditorValue(formatJson(JSON.parse(editorValue)));
      setError("");
      setStatus("JSON formatted successfully.");
    } catch {
      setError("The JSON is invalid, so it could not be formatted.");
    }
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    setStatus("Saving to GitHub...");

    try {
      const parsed = JSON.parse(editorValue);
      const response = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          store: parsed,
          message: commitMessage,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Save failed");

      setEditorValue(formatJson(parsed));
      setLastCommit(data.commit || null);
      setStatus("Saved to GitHub. Vercel will redeploy from that commit.");
    } catch (saveError) {
      setError(saveError.message || "Save failed");
      setStatus("");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#08111f] text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 border-b border-cyan-500/20 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <a href="/" className="text-sm text-cyan-300/80 transition hover:text-cyan-200">
              Back to portfolio
            </a>
            <h1 className="mt-3 font-[Outfit] text-4xl font-bold text-white">
              Portfolio Admin
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Edit your portfolio JSON here. Each save updates the GitHub repo file and
              then your Vercel deployment can redeploy from that commit.
            </p>
          </div>

          {repoInfo && (
            <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/60 px-4 py-3 text-xs text-slate-300">
              <div>Repo: {repoInfo.owner}/{repoInfo.repo}</div>
              <div>Branch: {repoInfo.branch}</div>
              <div>File: {repoInfo.dataPath}</div>
            </div>
          )}
        </div>

        {authState !== "authenticated" ? (
          <div className="mx-auto mt-8 w-full max-w-md rounded-3xl border border-cyan-500/20 bg-slate-950/70 p-8 shadow-2xl shadow-cyan-950/30">
            <h2 className="font-[Outfit] text-2xl font-semibold">Admin Login</h2>
            <p className="mt-2 text-sm text-slate-300">
              Use the admin password you set in your environment variables.
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                />
              </label>

              <button
                type="submit"
                disabled={authState === "checking"}
                className="w-full rounded-2xl bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {authState === "checking" ? "Checking..." : "Sign In"}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex flex-col gap-3 rounded-3xl border border-cyan-500/20 bg-slate-950/60 p-5 md:flex-row md:items-center">
              <input
                type="text"
                value={commitMessage}
                onChange={(event) => setCommitMessage(event.target.value)}
                className="flex-1 rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
                placeholder="Commit message"
              />

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={loadCurrentData}
                  className="rounded-2xl border border-slate-700 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-white"
                >
                  Reload
                </button>
                <button
                  type="button"
                  onClick={handleFormat}
                  className="rounded-2xl border border-slate-700 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-white"
                >
                  Format JSON
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl border border-rose-500/40 px-4 py-3 text-sm text-rose-200 transition hover:border-rose-400 hover:text-white"
                >
                  Logout
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || loadingData}
                  className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save to GitHub"}
                </button>
              </div>
            </div>

            <div className="grid flex-1 gap-4 lg:grid-cols-[1.5fr_0.7fr]">
              <div className="rounded-3xl border border-cyan-500/20 bg-slate-950/60 p-5">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-[Outfit] text-xl font-semibold">Portfolio Data</h2>
                  <span className="text-xs text-slate-400">
                    {loadingData ? "Loading..." : "Editing deployed JSON"}
                  </span>
                </div>

                <textarea
                  value={editorValue}
                  onChange={(event) => setEditorValue(event.target.value)}
                  spellCheck="false"
                  className="min-h-[65vh] w-full rounded-2xl border border-slate-800 bg-[#020817] p-4 font-mono text-sm leading-6 text-slate-100 outline-none transition focus:border-cyan-400"
                  placeholder='{"profile": {"name": "Nevil"}}'
                />
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-cyan-500/20 bg-slate-950/60 p-5">
                  <h2 className="font-[Outfit] text-xl font-semibold">How It Works</h2>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
                    <li>1. Sign in with your admin password.</li>
                    <li>2. Edit the JSON that powers the portfolio.</li>
                    <li>3. Save to GitHub to create a commit in your repo.</li>
                    <li>4. Vercel redeploys from that commit and your live site updates.</li>
                  </ul>
                </div>

                <div className="rounded-3xl border border-cyan-500/20 bg-slate-950/60 p-5">
                  <h2 className="font-[Outfit] text-xl font-semibold">Status</h2>
                  <div className="mt-3 space-y-3 text-sm">
                    {status && <p className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-emerald-200">{status}</p>}
                    {error && <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-rose-200">{error}</p>}
                    {!status && !error && (
                      <p className="rounded-2xl bg-slate-900 px-4 py-3 text-slate-300">
                        No action yet.
                      </p>
                    )}
                  </div>
                </div>

                {lastCommit && (
                  <div className="rounded-3xl border border-cyan-500/20 bg-slate-950/60 p-5">
                    <h2 className="font-[Outfit] text-xl font-semibold">Last Commit</h2>
                    <p className="mt-3 text-sm text-slate-300">
                      SHA: <span className="font-mono text-slate-100">{lastCommit.sha}</span>
                    </p>
                    {lastCommit.url && (
                      <a
                        href={lastCommit.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-sm text-cyan-300 transition hover:text-cyan-200"
                      >
                        Open commit on GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
