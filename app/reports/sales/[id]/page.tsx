// File: ./app/reports/sales/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface SalesReport {
  id: number;
  title: string;
  date: string;
  content: string;
}

const SalesReportDetails: React.FC = () => {
  const params = useParams();
  const { id } = params;
  const [report, setReport] = useState<SalesReport | null>(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch(`/api/reports/sales/${id}`);
        if (response.ok) {
          const data = await response.json();
          setReport(data);
        } else {
          console.error("Failed to fetch sales report");
        }
      } catch (error) {
        console.error("Error fetching sales report:", error);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id]);

  if (!report) {
    return <div>Loading report...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-4">{report.title}</h1>
      <p className="text-sm text-gray-400 mb-2">
        {new Date(report.date).toLocaleDateString()}
      </p>
      <div className="prose">{report.content}</div>
    </div>
  );
};

export default SalesReportDetails;
