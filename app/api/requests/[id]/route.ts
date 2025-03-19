// File: ./app/api/requests/[id]/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define interface for request data structure
interface StatusHistoryItem {
  status: string;
  timestamp: string;
  note: string;
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
}

interface Attachment {
  filename: string;
  url: string;
  type?: string;
  size?: number;
}

interface RequestData {
  id: number;
  reportType: string;
  status: string;
  description: string;
  priority?: string;
  name?: string;
  email?: string;
  phone?: string;
  attachments?: Attachment[];
  operationsField?: string;
  statusHistory?: StatusHistoryItem[];
  messages?: Message[];
}

const dataFilePath = path.join(process.cwd(), "data", "requests.json");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const requests = JSON.parse(fileData) as RequestData[];
    const req = requests.find(
      (r: RequestData) => r.id === parseInt(params.id, 10)
    );

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
