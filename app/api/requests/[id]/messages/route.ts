// File: ./app/api/requests/[id]/messages/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface ReportRequest {
  id: number;
  messages?: Array<{
    sender: string;
    content: string;
    timestamp: string;
  }>;
}

const dataFilePath = path.join(process.cwd(), "data", "requests.json");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const requests = JSON.parse(fileData);
    const req = requests.find(
      (r: ReportRequest) => r.id === parseInt(params.id, 10)
    );

    if (req) {
      return NextResponse.json(req.messages || []);
    } else {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error reading messages:", error);
    return NextResponse.error();
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { sender, content } = await request.json();
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const requests = JSON.parse(fileData);

    const requestIndex = requests.findIndex(
      (req: ReportRequest) => req.id === parseInt(params.id, 10)
    );
    if (requestIndex === -1) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }

    const newMessage = {
      sender,
      content,
      timestamp: new Date().toISOString(),
    };

    requests[requestIndex].messages = requests[requestIndex].messages || [];
    requests[requestIndex].messages.push(newMessage);

    fs.writeFileSync(dataFilePath, JSON.stringify(requests, null, 2));

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.error();
  }
}
