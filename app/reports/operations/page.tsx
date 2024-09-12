// File: ./app/reports/operations/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface OperationsReport {
  id: number;
  title: string;
  date: string;
  summary: string;
}

const OperationsReportsPage: React.FC = () => {
  const [reports, setReports] = useState<OperationsReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports/operations");
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        } else {
          console.error("Failed to fetch operations reports");
        }
      } catch (error) {
        console.error("Error fetching operations reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <div>Loading operations reports...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Operations Reports</h1>
      {reports.length === 0 ? (
        <p>No operations reports available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <div
              key={report.id}
              className="p-4 bg-gray-800 rounded shadow text-gray-100"
            >
              <h2 className="text-xl font-semibold mb-2">{report.title}</h2>
              <p className="text-sm text-gray-400 mb-2">
                {new Date(report.date).toLocaleDateString()}
              </p>
              <p>{report.summary}</p>
              <Link
                href={`/reports/operations/${report.id}`}
                className="text-blue-500 hover:underline mt-2 block"
              >
                View Full Report
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OperationsReportsPage;
