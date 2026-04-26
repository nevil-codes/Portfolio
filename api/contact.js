function getRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name = "", email = "", subject = "", message = "", company = "" } = req.body || {};

    if (company) {
      return res.status(200).json({ ok: true });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({ error: "Name, email, message required" });
    }

    const resendApiKey = getRequiredEnv("RESEND_API_KEY");
    const to = getRequiredEnv("CONTACT_TO_EMAIL");
    const from = getRequiredEnv("CONTACT_FROM_EMAIL");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: trimmedEmail,
        subject: trimmedSubject || `Portfolio contact from ${trimmedName}`,
        html: `
          <h2>New portfolio contact</h2>
          <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(trimmedSubject || "No subject")}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(trimmedMessage).replaceAll("\n", "<br />")}</p>
        `,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Resend error ${response.status}: ${text}`);
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Contact send failed" });
  }
}
