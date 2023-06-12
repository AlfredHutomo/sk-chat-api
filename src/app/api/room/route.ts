import { NextResponse } from "next/server";
import { prisma } from "~/utils/prisma";

// Get Rooms based on owner id
export async function GET(request: Request) {
  const res = await request.json();

  const userRooms = await prisma.room.findMany({
    where: {
      userId: res.userId,
    },
  });

  return NextResponse.json(userRooms);
}

// Create chat room
export async function POST(request: Request) {
  const res = await request.json();

  const newRoom = await prisma.room.create({
    data: {
      userId: res.userId,
      doctorId: res.doctorId,
    },
  });

  return NextResponse.json(newRoom);
}
