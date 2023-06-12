import { NextResponse } from "next/server";

// Create a chat for the room id in route room/[id]/chat
export async function POST(request: Request) {
  console.log("POST triggered");
  const res = await request.json();
  console.log(res);

  return NextResponse.json(res);
}
