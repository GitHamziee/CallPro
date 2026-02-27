import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { rateLimit } from "./rate-limit";

/**
 * Consistent success response.
 */
export function apiResponse(data: unknown, status = 200) {
  return NextResponse.json(data, { status });
}

/**
 * Consistent error response.
 */
export function apiError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Get authenticated session or return 401 error response.
 * Returns [session, null] on success, [null, errorResponse] on failure.
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [null, apiError("Unauthorized", 401)] as const;
  }

  return [session, null] as const;
}

/**
 * Get admin session or return 403 error response.
 * Returns [session, null] on success, [null, errorResponse] on failure.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [null, apiError("Unauthorized", 401)] as const;
  }

  if (session.user.role !== "ADMIN") {
    return [null, apiError("Forbidden", 403)] as const;
  }

  return [session, null] as const;
}

/**
 * Get agent session or return 403 error response.
 * Returns [session, null] on success, [null, errorResponse] on failure.
 */
export async function requireAgent() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [null, apiError("Unauthorized", 401)] as const;
  }

  if (session.user.role !== "AGENT") {
    return [null, apiError("Forbidden", 403)] as const;
  }

  return [session, null] as const;
}

/**
 * Get user session (role=USER) or return 403 error response.
 * Returns [session, null] on success, [null, errorResponse] on failure.
 */
export async function requireUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return [null, apiError("Unauthorized", 401)] as const;
  }

  if (session.user.role !== "USER") {
    return [null, apiError("Forbidden", 403)] as const;
  }

  return [session, null] as const;
}

/**
 * Apply rate limiting. Returns a 429 response if exceeded, null otherwise.
 */
export function applyRateLimit(
  key: string,
  limit: number,
  windowMs: number
): NextResponse | null {
  const rl = rateLimit(key, limit, windowMs);
  if (!rl.success) {
    return NextResponse.json(
      { error: `Too many requests. Try again in ${rl.retryAfter}s.` },
      { status: 429 }
    );
  }
  return null;
}
