"use client";

import React from "react";
import { useState } from "react";
import RequestForm from "../../components/RequestForm";
import TemplateGallery from "../../components/TemplateGallery";

interface TemplateFields {
  reportType: string;
  priority: string;
  description: string;
}

const RequestPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<
    TemplateFields | undefined
  >(undefined);

  const handleSelectTemplate = (templateFields: TemplateFields) => {
    setSelectedTemplate(templateFields);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">Submit a New Request</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <RequestForm prefillData={selectedTemplate} />
        <TemplateGallery onSelectTemplate={handleSelectTemplate} />
      </div>
    </div>
  );
};

export default RequestPage;
