import { NextResponse } from "next/server";
import { prisma } from "~/utils/prisma";

// Get Rooms object based on room id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  if (!params.id) {
    return NextResponse.json({ error: "Missing room id" });
  }

  const roomWithChats = await prisma.room.findUnique({
    where: {
      id: Number(params.id),
    },
    include: {
      chats: true,
    },
  });

  console.log(roomWithChats);

  return NextResponse.json(roomWithChats);
}
