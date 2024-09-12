import React from "react";
import StatusDashboard from "../../components/StatusDashboard";
import CommunicationThread from "../../components/CommunicationThread";
import SummaryMetrics from "../../components/SummaryMetrics";
import QuickAccess from "../../components/QuickAccess";

const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Executive Dashboard</h1>
      <SummaryMetrics />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          <StatusDashboard />
        </div>
        <div>
          <QuickAccess />
          <CommunicationThread />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
