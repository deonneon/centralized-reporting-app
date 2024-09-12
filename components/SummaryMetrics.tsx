"use client";

import React, { useEffect, useState } from "react";

const SummaryMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState([
    { label: "Total Reports", value: 0 },
    { label: "Pending Requests", value: 0 },
    { label: "Completed This Month", value: 0 },
    { label: "Average Turnaround Time", value: "N/A" },
  ]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/metrics");
        if (response.ok) {
          const data = await response.json();
          setMetrics(data);
        } else {
          console.error("Failed to fetch metrics");
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-800">
      {metrics.map((metric, index) => (
        <div key={index} className="p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-100">
            {metric.label}
          </h3>
          <p className="text-3xl font-bold mt-2 text-gray-100">
            {metric.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummaryMetrics;
