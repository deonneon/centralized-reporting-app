"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface StatusUpdate {
  status: string;
  timestamp: string;
}

interface Request {
  id: number;
  reportType: string;
  status: string;
  statusHistory: StatusUpdate[]; // Add statusHistory field
}

const StatusDashboard = () => {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/requests");
        if (response.ok) {
          const data = await response.json();
          setRequests(data);
        } else {
          console.error("Failed to fetch requests");
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();

    const interval = setInterval(fetchRequests, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 rounded shadow">
      <h2 className="text-xl mb-4">Your Requests</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Report Type</th>
            <th>Status</th>
            <th>Last Update</th> {/* Add Last Update column */}
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>
                <Link
                  href={`/requests/${req.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {req.reportType}
                </Link>
              </td>
              <td>{req.status}</td>
              <td>
                {/* Show last status update time */}
                {req.statusHistory && req.statusHistory.length > 0
                  ? new Date(
                      req.statusHistory[req.statusHistory.length - 1].timestamp
                    ).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatusDashboard;
