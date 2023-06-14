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

  let response = NextResponse.json(roomWithChats);

  response.headers.set(
    "Access-Control-Allow-Origin",
    "*" // Allow all origins
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS" // Allow the request methods.
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization" // Allow the headers.
  );

  return response;
}
