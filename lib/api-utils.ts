import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

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
