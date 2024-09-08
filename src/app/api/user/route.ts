import { NextResponse } from "next/server";
import { db } from "~/server/db/index";
import { users } from "~/server/db/schema";

interface CreateUserRequest {
  name: string;
}

interface CreateUserResponse {
  id: string;
  name: string|null;
  createdAt: Date;
}

export async function POST(request: Request) {
  const { name }: CreateUserRequest = await request.json();

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  try {
    const result = await db
      .insert(users)
      .values({ displayName: name })
      .returning();

    if (result[0] === undefined) throw "wrong";

    const newUser: CreateUserResponse = {
      id: result[0].id,
      name: result[0].displayName,
      createdAt: result[0].createdAt,
    };

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const response = await db.query.users.findMany();
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
