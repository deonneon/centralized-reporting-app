// File: ./app/api/reports/sales/[id]/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "salesReports.json");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const salesReports = JSON.parse(fileData);
    const report = salesReports.find(
      (r: any) => r.id === parseInt(params.id, 10)
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
    console.error("Error reading sales report:", error);
    return NextResponse.error();
  }
}
