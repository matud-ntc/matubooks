import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
const bcrypt = require("bcryptjs");

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });

  // Set cookie con duración de 30 días
  response.cookies.set("auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
    sameSite: "lax",
  });

  return response;
}
