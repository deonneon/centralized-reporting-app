// File: ./components/CommunicationThread.tsx
"use client";

import React, { useState, useEffect } from "react";

interface Message {
  sender: "User" | "Analyst";
  content: string;
  timestamp: string;
}

interface Props {
  requestId: number;
}

const CommunicationThread: React.FC<Props> = ({ requestId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/requests/${requestId}/messages`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [requestId]);

  const handleSend = async () => {
    const message = {
      sender: "User",
      content: newMessage,
    };

    try {
      const response = await fetch(`/api/requests/${requestId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        const savedMessage = await response.json();
        setMessages([...messages, savedMessage]);
        setNewMessage("");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded shadow">
      <h2 className="text-xl mb-4">Communication Thread</h2>
      <div className="mb-4 max-h-64 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === "User" ? "text-right" : "text-left"
            }`}
          >
            <p className="inline-block p-2 rounded bg-gray-700">
              {msg.content}
            </p>
            <span className="block text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l bg-gray-700 text-white"
          placeholder="Type a message"
        />
        <button
          onClick={handleSend}
          className="px-4 bg-blue-500 text-white rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default CommunicationThread;
