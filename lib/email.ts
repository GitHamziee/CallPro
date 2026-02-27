import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set. Add it to .env.local.");
    }
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

const FROM_EMAIL = "CallPro <onboarding@resend.dev>";

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
  userName?: string | null
) {
  const resend = getResend();

  const greeting = userName ? `Hi ${userName},` : "Hi,";

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject: "Reset your CallPro password",
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-size: 20px; font-weight: 700; color: #0f172a; margin: 0;">
            Call<span style="color: #2563eb;">Pro</span>
          </h1>
        </div>

        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 32px;">
          <h2 style="font-size: 18px; font-weight: 600; color: #0f172a; margin: 0 0 8px;">
            Reset your password
          </h2>
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
        </div>

        <p style="font-size: 12px; color: #cbd5e1; text-align: center; margin-top: 32px;">
          &copy; ${new Date().getFullYear()} CallPro. All rights reserved.
        </p>
      </div>
    `,
  });
}
