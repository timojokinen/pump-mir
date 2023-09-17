import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export const POST = async (request: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { name } = await request.json();

  if (!name || typeof name !== "string" || name === "") {
    return new NextResponse(JSON.stringify({ error: "Bad request" }), {
      status: 400,
    });
  }

  const exercise = await prisma.exercise.create({
    data: { name, creatorId: session.user.id },
  });

  return new NextResponse(JSON.stringify(exercise));
};
