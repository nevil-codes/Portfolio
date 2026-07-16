# Nevil Amraniya — Portfolio

Personal portfolio built with Next.js 14 (App Router) and Tailwind CSS.
Dark single-page site (work / stack / about / certifications / writing / contact)
plus a print-friendly resume at `/resume`.

## Editing content

**All text, links, projects, skills, education, and certifications live in one file:**

```
data/content.json
```

Edit that file (directly on GitHub works too) and the site updates on the next
deploy — no code changes needed. For example, to add a certification:

```json
"certifications": [
  {
    "name": "Certification name",
    "issuer": "Issuing organization",
    "year": "2026",
    "verifyUrl": "https://link-to-verify"
  }
]
```

An empty `certifications` array hides the section entirely.

The nav's Resume button points at `resumeUrl` in the same file — currently the
print-friendly `/resume` page; change it to `"/resume.pdf"` to link the PDF in
`public/` instead.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

Deploys on Vercel with zero config (auto-detected as Next.js).
