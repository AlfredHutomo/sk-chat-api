import { NextResponse } from "next/server";
import { prisma } from "~/utils/prisma";

// Create a chat for the room id in route room/[id]/chat
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const res = await request.json();

  if (!params.id) {
    return NextResponse.json({ error: "Missing room id" });
  }

  if (!res.userId || !res.message) {
    return NextResponse.json({ error: "Missing userId or message" });
  }

  const newChat = await prisma.chat.create({
    data: {
      roomId: Number(params.id),
      userId: String(res.userId),
      message: String(res.message),
    },
  });

  let response = NextResponse.json(newChat);

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
