import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define interface for finance report data structure
interface FinanceReport {
  id: number;
  title: string;
  date: string;
  summary: string;
  content: string;
}

const dataFilePath = path.join(process.cwd(), "data", "financeReports.json");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const financeReports = JSON.parse(fileData) as FinanceReport[];
    const report = financeReports.find(
      (r: FinanceReport) => r.id === parseInt(params.id, 10)
    );

    if (report) {
      return NextResponse.json(report);
    } else {
      return NextResponse.json(
        { message: "Report not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error reading finance report:", error);
    return NextResponse.error();
  }
}
