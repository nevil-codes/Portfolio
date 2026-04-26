import { isAuthenticated } from "../_lib/auth.js";
import { getRepoConfig } from "../_lib/github.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { owner, repo, branch, dataPath } = getRepoConfig();

  return res.status(200).json({
    authenticated: isAuthenticated(req),
    repo: { owner, repo, branch, dataPath },
  });
}
