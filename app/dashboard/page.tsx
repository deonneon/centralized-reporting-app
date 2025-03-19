"use client";

import React, { useState, useEffect } from "react";
import StatusDashboard from "../../components/StatusDashboard";
import SummaryMetrics from "../../components/SummaryMetrics";
import QuickAccess from "../../components/QuickAccess";
import CommunicationThread from "../../components/CommunicationThread";

const DashboardPage: React.FC = () => {
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  );

  // Fetch the most recent request ID to display its communication thread
  useEffect(() => {
    const fetchMostRecentRequest = async () => {
      try {
        const response = await fetch("/api/requests?limit=1");
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setSelectedRequestId(data[0].id);
          }
        } else {
          console.error("Failed to fetch recent request");
        }
      } catch (error) {
        console.error("Error fetching recent request:", error);
      }
    };

    fetchMostRecentRequest();
  }, []);

  // Function to handle request selection from StatusDashboard
  const handleRequestSelect = (requestId: number) => {
    setSelectedRequestId(requestId);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Executive Dashboard</h1>
      <SummaryMetrics />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <StatusDashboard onRequestSelect={handleRequestSelect} />
        </div>
        <div>
          <QuickAccess />
          {selectedRequestId ? (
            <div className="mt-6">
              <CommunicationThread requestId={selectedRequestId} />
            </div>
          ) : (
            <div className="mt-6 p-4 bg-gray-800 rounded shadow">
              <h2 className="text-xl mb-4">Communication Thread</h2>
              <p className="text-gray-400">
                Select a request to view its communication thread
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
