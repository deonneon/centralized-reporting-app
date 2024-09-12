import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "financeReports.json");

export async function GET() {
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const financeReports = JSON.parse(fileData);
    return NextResponse.json(financeReports);
  } catch (error) {
    console.error("Error reading finance reports:", error);
    return NextResponse.error();
  }
}
