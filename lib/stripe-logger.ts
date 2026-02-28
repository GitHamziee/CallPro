import prisma from "@/lib/prisma";
import Stripe from "stripe";

/**
 * Builds a rich error detail string from any error.
 * Captures type, code, and stack so you can tell "Stripe broke" vs "our code broke".
 *
 * Stripe errors → { source: "stripe", type, code, message }
 * Our code errors → { source: "application", type, message, stack }
 */
function formatError(error: unknown): string {
  if (error instanceof Stripe.errors.StripeError) {
    return JSON.stringify({
      source: "stripe",
      type: error.type,
      code: error.code,
      statusCode: error.statusCode,
      message: error.message,
    });
  }

  if (error instanceof Error) {
    return JSON.stringify({
      source: "application",
      type: error.constructor.name,
      message: error.message,
      stack: error.stack?.split("\n").slice(0, 5).join("\n"),
    });
  }

  return JSON.stringify({ source: "unknown", message: String(error) });
}

/**
 * Logs Stripe events (checkout attempts, webhook events, failures) to the StripeLog table.
 * Fire-and-forget — logging failures are caught and logged to console,
 * never breaking the actual Stripe flow.
 *
 * For errors, pass the raw error object to `errorObj` to get rich diagnostics.
 * For simple string errors (e.g. validation), use `error` string directly.
 */
export async function logStripeEvent(data: {
  event: string;
  sessionId?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
  response?: Record<string, unknown>;
  error?: string;
  errorObj?: unknown;
  status: "success" | "error";
}) {
  try {
    const errorDetail = data.errorObj
      ? formatError(data.errorObj)
      : data.error ?? null;

    await prisma.stripeLog.create({
      data: {
        event: data.event,
        sessionId: data.sessionId ?? null,
        userId: data.userId ?? null,
        metadata: data.metadata ? JSON.stringify(data.metadata) : null,
        response: data.response ? JSON.stringify(data.response) : null,
        error: errorDetail,
        status: data.status,
      },
    });
  } catch (e) {
    console.error("Failed to log Stripe event:", e);
  }
}
