# StoreX — Marketing Website

A fast, polished, mostly-static marketing site for **StoreX** (powered by
Lumora Technologies), a cloud + desktop point-of-sale platform for retail and
hospitality businesses. Built to convert visitors into demo / sign-up leads.

Built with **Next.js 14 (App Router)**, **TypeScript (strict)**,
**Tailwind CSS**, and **GSAP + ScrollTrigger** for animation. The only
server-side code is a contact-form route handler that sends email via
**Nodemailer**.

---

## ✨ Features

- **Single landing page** with anchored sections — Hero, Features, Why Lumora,
  Contact teaser — plus a dedicated routed `/contact` page.
- **GSAP animations**: staggered hero entrance timeline, floating/parallax
  product mockup, and `ScrollTrigger` reveal-on-scroll for every section.
- **Accessibility-first**: semantic HTML, labelled form fields with inline
  errors, visible focus rings, a skip link, and **full `prefers-reduced-motion`
  support** (animations short-circuit in both JS and CSS).
- **SEO-ready**: metadata + Open Graph / Twitter cards, JSON-LD structured data,
  generated `sitemap.xml` and `robots.txt`, and an SVG favicon.
- **Typed content config** — all copy lives in `content/*.ts`, no CMS / database.
- **Contact form** with shared client/server validation (Zod), loading /
  success / error states, a honeypot anti-spam field, and SMTP email delivery.

---

## 🚀 Getting started

```bash
npm install
cp .env.example .env.local   # then fill in SMTP values (see below)
npm run dev                  # http://localhost:3000
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server on :3000 |
| `npm run build` | Production build |
| `npm start` | Run the production build |
| `npm run lint` | ESLint (next/core-web-vitals) |
| `npm run typecheck` | `tsc --noEmit` (strict) |

---

## 🔧 Environment variables

The contact form posts to `app/api/contact/route.ts`, which sends email over
SMTP. Copy `.env.example` → `.env.local` and set:

| Variable | Description |
|---|---|
| `SMTP_HOST` | SMTP server host |
| `SMTP_PORT` | `587` (STARTTLS) or `465` (implicit TLS) |
| `SMTP_SECURE` | `"true"` for port 465, `"false"` for 587 |
| `SMTP_USER` | SMTP username |
| `SMTP_PASS` | SMTP password / app password |
| `CONTACT_FROM_EMAIL` | "From" header, e.g. `StoreX <no-reply@lumora.com>` |
| `CONTACT_TO_EMAIL` | Where submissions are delivered |
| `NEXT_PUBLIC_SITE_URL` | (optional) Canonical site URL for metadata/sitemap |

Works with any SMTP provider — Gmail App Passwords, Mailgun, Postmark,
SendGrid SMTP, Amazon SES, Resend, etc. If SMTP is not configured the form
returns a friendly error and logs the missing keys server-side.

---

## 📝 Editing content

All marketing copy is typed and centralized — no code changes needed for most edits:

- `content/site.ts` — site name, nav links, footer, contact details, socials.
- `content/features.ts` — the feature cards (icon + title + description).
- `content/highlights.ts` — the "Why Lumora" value-prop strip.

Icons come from [`lucide-react`](https://lucide.dev); set the `icon` field to any
exported icon component.

---

## 🎬 Animation notes

- GSAP plugins are registered **client-side only** in `lib/gsap.ts`.
- Reusable reveal logic lives in `lib/useScrollReveal.ts`; the hero timeline is
  in `components/Hero.tsx`.
- Every animation checks `useReducedMotion()` and **skips motion** (showing the
  final state) when the user prefers reduced motion. `globals.css` adds a CSS
  backstop for transitions/animations too.
- Only `transform` / `opacity` are animated — no layout thrash.

---

## 📦 Deploying to Vercel

1. Push this repo to GitHub/GitLab/Bitbucket.
2. Import it into [Vercel](https://vercel.com/new). Framework preset: **Next.js**
   (auto-detected). Build command `next build`, no extra config needed.
3. Add the environment variables above in **Project Settings → Environment
   Variables**.
4. Deploy. Pages are pre-rendered as static HTML; the contact route runs as a
   serverless function.

### Pure-static export (optional)

This project does **not** use `output: 'export'`, because that would strip the
contact API route. If you need a 100% static export (e.g. GitHub Pages / S3):

1. Set `output: 'export'` in `next.config.mjs`.
2. Delete `app/api/contact/route.ts` and point `ContactForm`'s `fetch` at an
   external form endpoint (Formspree, Web3Forms, a separate serverless
   function, etc.).
3. Run `npm run build` — the static site is emitted to `out/`.

---

## 🗂 Project structure

```
app/
  layout.tsx          # root layout, metadata/OG, fonts, skip link
  page.tsx            # landing page (assembles sections)
  globals.css         # Tailwind layers + base/components/utilities
  icon.svg            # favicon
  sitemap.ts          # generated sitemap.xml
  robots.ts           # generated robots.txt
  contact/page.tsx    # routed contact page
  api/contact/route.ts# Nodemailer SMTP handler (Node runtime)
components/           # Navbar, Hero, Features, Highlights, ContactTeaser,
                      # ContactForm, DashboardMockup, Footer, Logo
content/              # typed site/features/highlights config
lib/                  # gsap setup, reduced-motion + scroll-reveal hooks, zod schema
public/               # logo.svg, og.svg
```

---

© StoreX — Powered by Lumora Technologies. Placeholder copy is included where
real content was unavailable.
