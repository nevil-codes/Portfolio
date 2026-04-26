function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getRepoConfig() {
  return {
    owner: process.env.GITHUB_OWNER || "nevil-codes",
    repo: process.env.GITHUB_REPO || "Portfolio",
    branch: process.env.GITHUB_BRANCH || "main",
    dataPath: process.env.PORTFOLIO_DATA_PATH || "public/data.json",
  };
}

async function githubRequest(url, options = {}) {
  const token = getRequiredEnv("GITHUB_TOKEN");
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "portfolio-admin",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API error ${response.status}: ${text}`);
  }

  return response.json();
}

export async function savePortfolioData(store, commitMessage) {
  const { owner, repo, branch, dataPath } = getRepoConfig();
  const encodedPath = dataPath
    .split("/")
    .map(encodeURIComponent)
    .join("/");

  const contentUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`;
  const existing = await githubRequest(contentUrl);

  const normalizedContent = `${JSON.stringify(store, null, 2)}\n`;
  const updatePayload = {
    message: commitMessage || "Update portfolio data from admin panel",
    content: Buffer.from(normalizedContent, "utf8").toString("base64"),
    sha: existing.sha,
    branch,
  };

  const result = await githubRequest(contentUrl, {
    method: "PUT",
    body: JSON.stringify(updatePayload),
  });

  return {
    branch,
    path: dataPath,
    sha: result.commit?.sha || "",
    url: result.commit?.html_url || "",
  };
}
