import { useState } from "react";
import { ArrowLeft, Download, Mail, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Message send failed");
      }

      setStatus("sent");
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        company: "",
      });
    } catch (submitError) {
      setStatus("idle");
      setError(submitError.message || "Message send failed");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0c12] text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 transition hover:text-cyan-400"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </a>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl border border-neutral-800 bg-[#131620] p-8">
            <div className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
              Contact Me
            </div>
            <h1 className="mt-4 font-[Outfit] text-4xl font-bold">Let&apos;s Talk</h1>
            <p className="mt-4 text-sm leading-7 text-neutral-400">
              Send message here. I get email notification. Good for internships,
              freelance work, AI/ML collaboration, project discussion.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:framesofnevil@gmail.com"
                className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-black/20 px-4 py-4 text-sm text-neutral-300 transition hover:border-cyan-500/40 hover:text-white"
              >
                <Mail size={18} className="text-cyan-400" />
                framesofnevil@gmail.com
              </a>

              <a
                href="/resume.pdf"
                download
                className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-black/20 px-4 py-4 text-sm text-neutral-300 transition hover:border-cyan-500/40 hover:text-white"
              >
                <Download size={18} className="text-cyan-400" />
                Download Resume
              </a>
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-800 bg-black/20 p-4 text-xs leading-6 text-neutral-500">
              Resume location:
              <br />
              <code>/Users/nick/Portfolio/public/resume.pdf</code>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-neutral-800 bg-[#131620] p-8"
          >
            <div className="grid gap-5">
              <label className="grid gap-2">
                <span className="text-sm text-neutral-300">Name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={updateField}
                  required
                  className="rounded-2xl border border-neutral-700 bg-[#0a0c12] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-neutral-300">Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={updateField}
                  required
                  className="rounded-2xl border border-neutral-700 bg-[#0a0c12] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-neutral-300">Subject</span>
                <input
                  name="subject"
                  value={form.subject}
                  onChange={updateField}
                  className="rounded-2xl border border-neutral-700 bg-[#0a0c12] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm text-neutral-300">Message</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  required
                  rows={8}
                  className="rounded-2xl border border-neutral-700 bg-[#0a0c12] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
                />
              </label>

              <input
                type="text"
                name="company"
                value={form.company}
                onChange={updateField}
                tabIndex="-1"
                autoComplete="off"
                className="hidden"
              />

              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {status === "sent" && (
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  Message sent. Check inbox soon.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send size={16} />
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
