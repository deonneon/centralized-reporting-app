"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CommunicationThread from "../../../components/CommunicationThread";

interface Request {
  id: number;
  reportType: string;
  status: string;
  description: string;
  statusHistory?: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
}

const RequestDetails = () => {
  const params = useParams();
  const id = params?.id
    ? Array.isArray(params.id)
      ? parseInt(params.id[0], 10)
      : parseInt(params.id, 10)
    : null;
  const [request, setRequest] = useState<Request | null>(null);
  const [statusHistory, setStatusHistory] = useState<
    NonNullable<Request["statusHistory"]>
  >([]);

  useEffect(() => {
    if (id) {
      const fetchRequest = async () => {
        try {
          const response = await fetch(`/api/requests/${id}`);
          if (response.ok) {
            const data: Request = await response.json();
            setRequest(data);
            setStatusHistory(data.statusHistory || []);
          } else {
            console.error("Failed to fetch request");
          }
        } catch (error) {
          console.error("Error fetching request:", error);
        }
      };

      fetchRequest();
    }
  }, [id]);

  if (!request) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-4">Request Details</h1>
      <div className="mb-6">
        <p>
          <strong>ID:</strong> {request.id}
        </p>
        <p>
          <strong>Report Type:</strong> {request.reportType}
        </p>
        <p>
          <strong>Status:</strong> {request.status}
        </p>
        <p>
          <strong>Description:</strong> {request.description}
        </p>
      </div>

      {/* Status History */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Status History</h2>
        <ul className="list-disc pl-5">
          {statusHistory.map((statusUpdate, index) => (
            <li key={index}>
              <p>
                <strong>{statusUpdate.status}</strong> -{" "}
                {new Date(statusUpdate.timestamp).toLocaleString()}
              </p>
              {statusUpdate.note && <p>{statusUpdate.note}</p>}
            </li>
          ))}
        </ul>
      </div>

      {/* Communication Thread */}
      {request && <CommunicationThread requestId={request.id} />}
    </div>
  );
};

export default RequestDetails;
