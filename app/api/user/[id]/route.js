import { NextResponse } from "next/server.js";
import { getUserById, updateUserById } from "@/services/mongoCRUD";

export async function GET(req, { params }) {
  try {
    const user = await getUserById(params.id);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 404 });
  }
}

export async function PUT(request, { params }) {
  try {
    const conversation = await request.json();
    const response = await updateUserById(params.id, conversation);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
