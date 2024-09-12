// File: ./app/api/reports/sales/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "salesReports.json");

export async function GET() {
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const salesReports = JSON.parse(fileData);
    return NextResponse.json(salesReports);
  } catch (error) {
    console.error("Error reading sales reports:", error);
    return NextResponse.error();
  }
}
