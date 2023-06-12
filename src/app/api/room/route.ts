import { NextResponse } from "next/server";

// Get Rooms based on owner id
export async function GET(request: Request) {
  console.log("GET triggered");
  const res = await request.json();
  console.log(res);

  return NextResponse.json({ hello: "world" });
}

// Create chat room
export async function POST(request: Request) {
  console.log("POST triggered");
  const res = await request.json();
  console.log(res);

  return NextResponse.json(res);
}
