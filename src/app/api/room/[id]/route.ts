import { NextResponse } from "next/server";
import { prisma } from "~/utils/prisma";

// Get Rooms object based on room id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const roomWithChats = prisma.room.findFirst({
    where: {
      id: Number(params.id),
    },
    include: {
      chats: true,
    },
  });

  return NextResponse.json(roomWithChats);
}
