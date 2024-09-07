// src/app/api/user/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "~/server/db/index";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
