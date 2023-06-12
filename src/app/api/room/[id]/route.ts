import { NextResponse } from "next/server";

// Get Rooms object based on room id
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(params.id);
  console.log("GET triggered");
  //   const res = await request.json();
  //   console.log(res);

  return NextResponse.json({ hello: "world" });
}
