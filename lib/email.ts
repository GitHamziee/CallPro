import nodemailer from "nodemailer";

function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error(
      "Missing SMTP config. Set SMTP_HOST, SMTP_USER, and SMTP_PASS in .env.local."
    );
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

const FROM = () => `R4Referral <${process.env.SMTP_FROM ?? process.env.SMTP_USER}>`;

const baseWrapper = (content: string, year = new Date().getFullYear()) => `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
    <div style="text-align: center; margin-bottom: 32px;">
      <h1 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">
        R4<span style="color: #2563eb;">Referral</span>
      </h1>
    </div>
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
      ${content}
    </div>
    <p style="font-size: 12px; color: #cbd5e1; text-align: center; margin-top: 32px;">
      &copy; ${year} R4Referral. All rights reserved.
    </p>
  </div>
`;

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
  userName?: string | null
) {
  const greeting = userName ? `Hi ${userName},` : "Hi,";

  await getTransporter().sendMail({
    from: FROM(),
    to,
    subject: "Reset your R4Referral password",
    html: baseWrapper(`
      <h2 style="font-size: 18px; font-weight: 600; color: #0f172a; margin: 0 0 8px;">Reset your password</h2>
      <p style="font-size: 14px; color: #64748b; margin: 0 0 24px; line-height: 1.6;">
        ${greeting} We received a request to reset your password. Click the button below to choose a new one.
      </p>
      <a href="${resetUrl}" style="display: inline-block; background: #2563eb; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px;">
        Reset Password
      </a>
      <p style="font-size: 13px; color: #94a3b8; margin: 24px 0 0; line-height: 1.6;">
        This link expires in 1 hour. If you didn&rsquo;t request this, you can safely ignore this email.
      </p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="font-size: 12px; color: #94a3b8; margin: 0; line-height: 1.5;">
        If the button doesn&rsquo;t work, copy and paste this link into your browser:<br />
        <a href="${resetUrl}" style="color: #2563eb; word-break: break-all;">${resetUrl}</a>
      </p>
    `),
  });
}

export async function sendLeadAssignedEmail(
  to: string,
  userName: string | null,
  lead: { name: string; leadType: string }
) {
  const greeting = userName ? `Hi ${userName},` : "Hi,";
  const portalUrl = `${process.env.NEXTAUTH_URL ?? "https://app.r4referral.com"}/my-leads`;
  const typeLabel = lead.leadType === "BUYER" ? "Buyer" : "Seller";

  await getTransporter().sendMail({
    from: FROM(),
    to,
    subject: "You have a new lead waiting — R4Referral",
    html: baseWrapper(`
      <h2 style="font-size: 18px; font-weight: 600; color: #0f172a; margin: 0 0 8px;">New lead assigned to you</h2>
      <p style="font-size: 14px; color: #64748b; margin: 0 0 20px; line-height: 1.6;">
        ${greeting} A new <strong>${typeLabel}</strong> lead has been assigned to your account and is waiting for your review.
      </p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 12px; font-size: 13px; font-weight: 600; color: #64748b; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px 0 0 6px; width: 40%;">Lead Name</td>
          <td style="padding: 10px 12px; font-size: 13px; color: #0f172a; background: #f8fafc; border: 1px solid #e2e8f0; border-left: none;">${lead.name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-size: 13px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 0 6px; width: 40%;">Type</td>
          <td style="padding: 10px 12px; font-size: 13px; color: #0f172a; border: 1px solid #e2e8f0; border-top: none; border-left: none;">${typeLabel}</td>
        </tr>
      </table>
      <p style="font-size: 14px; color: #64748b; margin: 0 0 20px; line-height: 1.6;">
        Log in to your portal to review the lead details and accept or decline.
      </p>
      <a href="${portalUrl}" style="display: inline-block; background: #2563eb; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px;">
        View My Leads
      </a>
      <p style="font-size: 12px; color: #94a3b8; margin: 24px 0 0; line-height: 1.6;">
        Contact details are revealed once you accept the lead.
      </p>
    `),
  });
}

export async function sendPlanPurchasedEmail(
  to: string,
  userName: string | null,
  packageName: string,
  expiresAt: Date | null
) {
  const greeting = userName ? `Hi ${userName},` : "Hi,";
  const portalUrl = `${process.env.NEXTAUTH_URL ?? "https://app.r4referral.com"}/dashboard`;
  const expiryLine = expiresAt
    ? expiresAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : "Does not expire";

  await getTransporter().sendMail({
    from: FROM(),
    to,
    subject: `Your ${packageName} plan is now active — R4Referral`,
    html: baseWrapper(`
      <h2 style="font-size: 18px; font-weight: 600; color: #0f172a; margin: 0 0 8px;">Your plan is active!</h2>
      <p style="font-size: 14px; color: #64748b; margin: 0 0 20px; line-height: 1.6;">
        ${greeting} Your payment was successful and your <strong>${packageName}</strong> plan is now active.
      </p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 12px; font-size: 13px; font-weight: 600; color: #64748b; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px 0 0 6px; width: 40%;">Plan</td>
          <td style="padding: 10px 12px; font-size: 13px; color: #0f172a; background: #f8fafc; border: 1px solid #e2e8f0; border-left: none;">${packageName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-size: 13px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 0 6px; width: 40%;">Expires</td>
          <td style="padding: 10px 12px; font-size: 13px; color: #0f172a; border: 1px solid #e2e8f0; border-top: none; border-left: none;">${expiryLine}</td>
        </tr>
      </table>
      <p style="font-size: 14px; color: #64748b; margin: 0 0 20px; line-height: 1.6;">
        You&rsquo;ll receive email notifications whenever a new lead is assigned to your account. Visit your dashboard to get started.
      </p>
      <a href="${portalUrl}" style="display: inline-block; background: #2563eb; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px;">
        Go to Dashboard
      </a>
    `),
  });
}

export async function sendInvoicePaidEmail(
  to: string,
  userName: string | null,
  amountCents: number,
  leadName: string
) {
  const greeting = userName ? `Hi ${userName},` : "Hi,";
  const portalUrl = `${process.env.NEXTAUTH_URL ?? "https://app.r4referral.com"}/my-leads`;
  const amountFormatted = (amountCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  await getTransporter().sendMail({
    from: FROM(),
    to,
    subject: "Payment received — R4Referral",
    html: baseWrapper(`
      <h2 style="font-size: 18px; font-weight: 600; color: #0f172a; margin: 0 0 8px;">Payment confirmed</h2>
      <p style="font-size: 14px; color: #64748b; margin: 0 0 20px; line-height: 1.6;">
        ${greeting} We&rsquo;ve received your payment. Here&rsquo;s a summary:
      </p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 10px 12px; font-size: 13px; font-weight: 600; color: #64748b; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px 0 0 6px; width: 40%;">Lead</td>
          <td style="padding: 10px 12px; font-size: 13px; color: #0f172a; background: #f8fafc; border: 1px solid #e2e8f0; border-left: none;">${leadName}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-size: 13px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 0 6px; width: 40%;">Amount Paid</td>
          <td style="padding: 10px 12px; font-size: 13px; font-weight: 700; color: #16a34a; border: 1px solid #e2e8f0; border-top: none; border-left: none;">${amountFormatted}</td>
        </tr>
        <tr>
          <td style="padding: 10px 12px; font-size: 13px; font-weight: 600; color: #64748b; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 0 6px; width: 40%;">Status</td>
          <td style="padding: 10px 12px; font-size: 13px; font-weight: 600; color: #16a34a; border: 1px solid #e2e8f0; border-top: none; border-left: none;">Paid</td>
        </tr>
      </table>
      <a href="${portalUrl}" style="display: inline-block; background: #2563eb; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 8px;">
        View My Leads
      </a>
    `),
  });
}
