// File: ./app/api/requests/[id]/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "requests.json");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const requests = JSON.parse(fileData);
    const req = requests.find((r: any) => r.id === parseInt(params.id, 10));

    if (req) {
      return NextResponse.json(req);
    } else {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error reading request:", error);
    return NextResponse.error();
  }
}
