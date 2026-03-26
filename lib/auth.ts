import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export const USER_SESSION_COOKIE = "user_session";

export function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function newSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(userId: string) {
  const token = newSessionToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14); // 14 days

  await prisma.session.create({
    data: { userId, tokenHash, expiresAt },
  });

  const jar = await cookies();
  jar.set(USER_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(USER_SESSION_COOKIE)?.value;
  if (token) {
    const tokenHash = hashToken(token);
    await prisma.session.deleteMany({ where: { tokenHash } });
  }
  jar.delete(USER_SESSION_COOKIE);
}

export async function getAuthedUser() {
  const jar = await cookies();
  const token = jar.get(USER_SESSION_COOKIE)?.value;
  if (!token) return null;
  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    include: { user: true },
  });
  if (!session) return null;
  if (session.expiresAt.getTime() <= Date.now()) {
    await prisma.session.deleteMany({ where: { tokenHash } });
    jar.delete(USER_SESSION_COOKIE);
    return null;
  }
  return session.user;
}
