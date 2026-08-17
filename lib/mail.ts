import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";

export type InquiryPayload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

let transporter: nodemailer.Transporter | null = null;

function env(name: string) {
  return (process.env[name] || "").trim().replace(/^["']|["']$/g, "");
}

function getTransporter() {
  const host = env("SMTP_HOST");
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS").replace(/\s+/g, "");
  const port = Number(env("SMTP_PORT") || 587);
  const secure = env("SMTP_SECURE") === "true" || port === 465;

  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      requireTLS: !secure,
      auth: { user, pass },
    });
  }

  return transporter;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function fromAddress() {
  return env("MAIL_FROM") || `Ads House <${env("SMTP_USER")}>`;
}

function ownerInbox() {
  return env("MAIL_TO") || siteConfig.email;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #e8eef6;color:#64748b;font-size:13px;width:140px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid #e8eef6;color:#0f172a;font-size:14px;">${escapeHtml(value)}</td>
  </tr>`;
}

function layout(title: string, body: string) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f3f6fb;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6fb;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e8eef6;">
            <tr>
              <td style="background:#0b1b36;padding:22px 28px;">
                <p style="margin:0;color:#22d3ee;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;">Ads House</p>
                <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;line-height:1.3;">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">${body}</td>
            </tr>
            <tr>
              <td style="padding:0 28px 28px;color:#64748b;font-size:12px;line-height:1.6;">
                Ads House · Rohtak, Haryana<br />
                <a href="${siteConfig.url}" style="color:#2563eb;text-decoration:none;">${siteConfig.url.replace("https://", "")}</a>
                · <a href="mailto:${siteConfig.email}" style="color:#2563eb;text-decoration:none;">${siteConfig.email}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function ownerHtml(inquiry: InquiryPayload) {
  return layout(
    "New project inquiry",
    `<p style="margin:0 0 18px;color:#334155;font-size:15px;line-height:1.6;">
      ${escapeHtml(inquiry.name)} submitted the contact form on adshouse.in.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Name", inquiry.name)}
      ${row("Email", inquiry.email)}
      ${row("Phone", inquiry.phone)}
      ${row("Company", inquiry.company)}
      ${row("Service", inquiry.service)}
      ${row("Budget", inquiry.budget)}
      ${row("Brief", inquiry.message)}
    </table>
    <p style="margin:18px 0 0;color:#64748b;font-size:13px;">Reply to this email to write them directly.</p>`,
  );
}

function senderHtml(inquiry: InquiryPayload) {
  return layout(
    "We have your brief",
    `<p style="margin:0 0 14px;color:#334155;font-size:15px;line-height:1.6;">
      Hi ${escapeHtml(inquiry.name)},
    </p>
    <p style="margin:0 0 18px;color:#334155;font-size:15px;line-height:1.6;">
      Thanks for writing to Ads House. A strategist will reply within one business day — usually sooner.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${row("Company", inquiry.company)}
      ${row("Service", inquiry.service)}
      ${row("Budget", inquiry.budget)}
      ${row("Brief", inquiry.message)}
    </table>
    <p style="margin:18px 0 0;color:#334155;font-size:15px;line-height:1.6;">
      Need to add something? Reply to this email or call
      <a href="${siteConfig.phoneHref}" style="color:#2563eb;text-decoration:none;">${siteConfig.phone}</a>.
    </p>`,
  );
}

function ownerText(inquiry: InquiryPayload) {
  return [
    "New project inquiry from adshouse.in",
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Company: ${inquiry.company}`,
    `Service: ${inquiry.service}`,
    `Budget: ${inquiry.budget}`,
    "",
    "Brief:",
    inquiry.message,
  ].join("\n");
}

function senderText(inquiry: InquiryPayload) {
  return [
    `Hi ${inquiry.name},`,
    "",
    "Thanks for writing to Ads House. A strategist will reply within one business day.",
    "",
    `Company: ${inquiry.company}`,
    `Service: ${inquiry.service}`,
    `Budget: ${inquiry.budget}`,
    "",
    "Brief:",
    inquiry.message,
    "",
    `Ads House · ${siteConfig.phone} · ${siteConfig.email}`,
  ].join("\n");
}

export async function sendInquiryEmails(inquiry: InquiryPayload) {
  const mailer = getTransporter();
  const toOwner = ownerInbox();
  const from = fromAddress();

  const ownerResult = await mailer.sendMail({
    from,
    to: toOwner,
    replyTo: inquiry.email,
    subject: `New inquiry from ${inquiry.name} — ${inquiry.service}`,
    text: ownerText(inquiry),
    html: ownerHtml(inquiry),
  });

  if (!ownerResult.accepted?.length) {
    throw new Error(`Lead email was not accepted for ${toOwner}`);
  }

  console.info("[Ads House inquiry] lead mailed", {
    to: toOwner,
    accepted: ownerResult.accepted,
    messageId: ownerResult.messageId,
  });

  try {
    await mailer.sendMail({
      from,
      to: inquiry.email,
      replyTo: toOwner,
      subject: "We received your brief | Ads House",
      text: senderText(inquiry),
      html: senderHtml(inquiry),
    });
  } catch (error) {
    console.error("[Ads House inquiry] confirmation mail failed", error);
  }
}
