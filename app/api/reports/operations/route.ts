import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "operationsReports.json");

export async function GET() {
  try {
    const fileData = fs.readFileSync(dataFilePath, "utf8");
    const operationsReports = JSON.parse(fileData);
    return NextResponse.json(operationsReports);
  } catch (error) {
    console.error("Error reading operations reports:", error);
    return NextResponse.error();
  }
}
