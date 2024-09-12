import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "requests.json");

export async function GET() {
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const requests = JSON.parse(fileData);
    return NextResponse.json(requests);
  } catch (error) {
    console.error("Error reading requests:", error);
    return NextResponse.error();
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, note } = await request.json();
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const requests = JSON.parse(fileData);

    const requestIndex = requests.findIndex((req) => req.id === id);
    if (requestIndex === -1) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }

    requests[requestIndex].status = status;
    const statusUpdate = {
      status,
      timestamp: new Date().toISOString(),
      note: note || "",
    };
    requests[requestIndex].statusHistory =
      requests[requestIndex].statusHistory || [];
    requests[requestIndex].statusHistory.push(statusUpdate);

    fs.writeFileSync(dataFilePath, JSON.stringify(requests, null, 2));

    return NextResponse.json(requests[requestIndex]);
  } catch (error) {
    console.error("Error handling PUT request:", error);
    return NextResponse.error();
  }
}
