import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema, formatZodErrors } from "@/lib/validation";

// This route needs the Node.js runtime (Nodemailer uses Node TCP/TLS sockets).
export const runtime = "nodejs";
// Never cache form submissions.
export const dynamic = "force-dynamic";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  // 1. Parse JSON body defensively.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // 2. Validate with the shared schema (same rules as the client).
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", fieldErrors: formatZodErrors(parsed.error) },
      { status: 422 }
    );
  }

  const { name, business, phone, message, company_website } = parsed.data;

  // 3. Honeypot: silently accept (200) so bots don't learn they were caught,
  //    but don't send the email.
  if (company_website && company_website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  // 4. Ensure SMTP is configured. Fail loudly in logs, gently to the user.
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } =
    process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    console.error(
      "[contact] Missing SMTP configuration. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL."
    );
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please email us directly." },
      { status: 500 }
    );
  }

  // 5. Build the transporter and send.
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subject = `New demo request — ${business}`;
  const text = [
    `Name:     ${name}`,
    `Business: ${business}`,
    `Phone:    ${phone}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:auto;color:#0a1b4d">
      <h2 style="color:#1859a6;margin:0 0 16px">New demo request</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#64748b">Name</td><td style="padding:6px 0;font-weight:600">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Business</td><td style="padding:6px 0;font-weight:600">${escapeHtml(business)}</td></tr>
        <tr><td style="padding:6px 0;color:#64748b">Phone</td><td style="padding:6px 0;font-weight:600">${escapeHtml(phone)}</td></tr>
      </table>
      <p style="margin:16px 0 6px;color:#64748b;font-size:14px">Message</p>
      <p style="white-space:pre-wrap;background:#f1f5f9;border-radius:10px;padding:14px;font-size:14px;line-height:1.6">${escapeHtml(
        message
      )}</p>
    </div>`;

  try {
    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL || SMTP_USER,
      to: CONTACT_TO_EMAIL,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json(
      { error: "We couldn't send your message right now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
