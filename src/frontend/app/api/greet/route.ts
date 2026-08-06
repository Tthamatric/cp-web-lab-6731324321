import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");
  const backendUrl = process.env.BACKEND_URL ?? "http://127.0.0.1:3000";

  const url = name
    ? `${backendUrl}/greet?name=${encodeURIComponent(name)}`
    : `${backendUrl}/greet`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json(
      { message: "Failed to reach backend" },
      { status: 502 },
    );
  }
}
