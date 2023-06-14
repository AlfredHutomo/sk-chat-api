import { Room } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "~/utils/prisma";

// Create chat room
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  const userType = url.searchParams.get("userType");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" });
  }

  let userRooms: Room[] = [];

  if (userType === "DOCTOR") {
    userRooms = await prisma.room.findMany({
      where: {
        doctorId: userId,
      },
    });
  } else {
    userRooms = await prisma.room.findMany({
      where: {
        userId: userId,
      },
    });
  }

  let response = NextResponse.json(userRooms);

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

// Create chat room
export async function POST(request: Request) {
  const res = await request.json();

  if (!res.userId || !res.doctorId) {
    return NextResponse.json({ error: "Missing userId or doctorId" });
  }

  const newRoom = await prisma.room.create({
    data: {
      userId: String(res.userId),
      doctorId: String(res.doctorId),
    },
  });

  let response = NextResponse.json(newRoom);

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

  return NextResponse.json(newRoom);
}
