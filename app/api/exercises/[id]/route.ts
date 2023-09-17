import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const id = params.id;

  const exercise = await prisma.exercise.findFirst({ where: { id } });
  if (!exercise) {
    return new NextResponse(JSON.stringify({ error: "Not found" }), {
      status: 404,
    });
  }

  if (exercise.creatorId !== session.user.id) {
    return new NextResponse(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
    });
  }

  await prisma.exercise.delete({ where: { id } });
};
