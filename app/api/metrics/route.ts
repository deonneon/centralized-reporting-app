import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Request {
  id: number;
  status: string;
  messages?: Array<{
    sender: string;
    content: string;
    timestamp: string;
  }>;
  statusHistory?: Array<{
    status: string;
    timestamp: string;
    note: string;
  }>;
}

const dataFilePath = path.join(process.cwd(), "data", "requests.json");

export async function GET() {
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const requests = JSON.parse(fileData) as Request[];

    const totalReports = requests.length;
    const pendingRequests = requests.filter(
      (req: Request) => req.status === "Submitted"
    ).length;

    const completedThisMonth = requests.filter((req: Request) => {
      const completed = req.status === "Completed";
      if (completed) {
        const requestDate = new Date(req.id);
        const now = new Date();
        return (
          requestDate.getMonth() === now.getMonth() &&
          requestDate.getFullYear() === now.getFullYear()
        );
      }
      return false;
    }).length;

    const averageTurnaroundTime = "N/A"; // Implement calculation if needed

    const metrics = [
      { label: "Total Reports", value: totalReports },
      { label: "Pending Requests", value: pendingRequests },
      { label: "Completed This Month", value: completedThisMonth },
      { label: "Average Turnaround Time", value: averageTurnaroundTime },
    ];

    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error calculating metrics:", error);
    return NextResponse.error();
  }
}
