import React from "react";

interface TemplateFields {
  reportType: string;
  priority: string;
  description: string;
}

interface Template {
  name: string;
  description: string;
  fields: TemplateFields;
}

interface TemplateGalleryProps {
  onSelectTemplate: (fields: TemplateFields) => void;
}

const templates: Template[] = [
  {
    name: "Monthly Sales Report",
    description: "Detailed sales figures for the month.",
    fields: {
      reportType: "Sales Report",
      priority: "Medium",
      description: "Please provide the monthly sales data.",
    },
  },
  // Add more templates as needed
];

const TemplateGallery: React.FC<TemplateGalleryProps> = ({
  onSelectTemplate,
}) => {
  return (
    <div className="p-4 rounded shadow">
      <h2 className="text-xl mb-4">Template Gallery</h2>
      <div className="grid grid-cols-1 gap-4">
        {templates.map((template, index) => (
          <div key={index} className="p-4 border rounded">
            <h3 className="text-lg">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
            <button
              onClick={() => onSelectTemplate(template.fields)}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateGallery;
