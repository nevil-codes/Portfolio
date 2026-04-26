import { isAuthenticated } from "../_lib/auth.js";
import { savePortfolioData } from "../_lib/github.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const { store, message } = req.body || {};

    if (!store || typeof store !== "object" || Array.isArray(store)) {
      return res.status(400).json({ error: "A JSON object is required" });
    }

    const result = await savePortfolioData(
      store,
      typeof message === "string" && message.trim()
        ? message.trim().slice(0, 120)
        : undefined
    );

    return res.status(200).json({ ok: true, commit: result });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Save failed" });
  }
}
