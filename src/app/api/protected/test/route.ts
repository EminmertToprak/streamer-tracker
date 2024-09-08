import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession();

  return NextResponse.json(
    { message: `This route is protected, logged in as ${session?.user.name}` },
    { status: 200 },
  );
}
