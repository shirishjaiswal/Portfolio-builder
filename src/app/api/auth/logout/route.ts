import { deleteSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await deleteSession();
    const res = NextResponse.json("Logged out successfully", { status: 200 });
    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
