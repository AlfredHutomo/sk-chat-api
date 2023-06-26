import { NextResponse } from "next/server";
import { prisma } from "~/utils/prisma";

// Get chats in room based on room id
export async function GET(request: Request) {
  const url = new URL(request.url);
  const roomId = url.searchParams.get("roomId");

  if (!roomId) {
    return NextResponse.json({ error: "Missing room id" });
  }

  const roomWithChats = await prisma.room.findUnique({
    where: {
      id: Number(roomId),
    },
    include: {
      chats: true,
    },
  });

  return new Response(JSON.stringify(roomWithChats), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });

  // let response = NextResponse.json(roomWithChats);

  // response.headers.set(
  //   "Access-Control-Allow-Origin",
  //   "*" // Allow all origins
  // );
  // response.headers.set(
  //   "Access-Control-Allow-Methods",
  //   "GET, POST, PUT, DELETE, OPTIONS" // Allow the request methods.
  // );
  // response.headers.set(
  //   "Access-Control-Allow-Headers",
  //   "Content-Type, Authorization" // Allow the headers.
  // );

  // return response;
}

// Create a chat for the room id in route room/[id]/chat
export async function POST(request: Request) {
  const url = new URL(request.url);
  const roomId = url.searchParams.get("roomId");

  const res = await request.json();

  if (!roomId) {
    return NextResponse.json({ error: "Missing room id" });
  }

  if (!res.userId || !res.message) {
    return NextResponse.json({ error: "Missing userId or message" });
  }

  const newChat = await prisma.chat.create({
    data: {
      roomId: Number(roomId),
      userId: String(res.userId),
      message: String(res.message),
    },
  });

  return new Response(JSON.stringify(newChat), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
