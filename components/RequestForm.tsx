import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface RequestFormProps {
  prefillData?: {
    reportType: string;
    priority: string;
    description: string;
  };
}

const RequestForm: React.FC<RequestFormProps> = ({ prefillData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [step, setStep] = useState(1);
  const [reportType, setReportType] = useState("");

  useEffect(() => {
    if (prefillData) {
      Object.entries(prefillData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [prefillData, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Request submitted successfully!");
        // Optionally, reset the form or redirect the user
      } else {
        alert("Failed to submit request.");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("An error occurred while submitting your request.");
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-gray-800 rounded shadow-lg text-gray-100"
    >
      {/* Step Indicators */}
      <div className="flex justify-between mb-6">
        <div
          className={`text-center ${
            step === 1 ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <div className="w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center">
            1
          </div>
          <p className="mt-2">Basic Info</p>
        </div>
        <div
          className={`text-center ${
            step === 2 ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <div className="w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center">
            2
          </div>
          <p className="mt-2">Details</p>
        </div>
        <div
          className={`text-center ${
            step === 3 ? "text-blue-600" : "text-gray-400"
          }`}
        >
          <div className="w-8 h-8 mx-auto rounded-full border-2 flex items-center justify-center">
            3
          </div>
          <p className="mt-2">Contact Info</p>
        </div>
      </div>

      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Step 1: Basic Information</h2>
          <div className="mb-4">
            <label className="block mb-2">Report Type</label>
            <select
              {...register("reportType", {
                required: "Report Type is required",
              })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              onChange={(e) => {
                setReportType(e.target.value);
                setValue("reportType", e.target.value);
              }}
            >
              <option value="">Select Report Type</option>
              <option value="sales">Sales Report</option>
              <option value="finance">Financial Report</option>
              <option value="operations">Operations Report</option>
            </select>
            {errors.reportType && (
              <p className="text-red-500">{errors.reportType.message}</p>
            )}
          </div>
          {/* Priority Field */}
          <div className="mb-4">
            <label className="block mb-2">Priority</label>
            <select
              {...register("priority", { required: "Priority is required" })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            >
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && (
              <p className="text-red-500">{errors.priority.message}</p>
            )}
          </div>
          <button
            type="button"
            onClick={nextStep}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-300"
          >
            Next
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="text-2xl font-bold mb-4">Step 2: Details</h2>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              rows={4}
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          {/* Conditional Field */}
          {reportType === "operations" && (
            <div className="mb-4">
              <label className="block mb-2">Operations Specific Field</label>
              <input
                {...register("operationsField", {
                  required: "This field is required for Operations Report",
                })}
                className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
                type="text"
              />
              {errors.operationsField && (
                <p className="text-red-500">{errors.operationsField.message}</p>
              )}
            </div>
          )}
          <div className="mb-4">
            <label className="block mb-2">Attachments</label>
            <input
              type="file"
              {...register("attachments")}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              multiple
            />
          </div>
          <div className="space-x-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition duration-300"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-300"
            >
              Next
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Step 3: Contact Information
          </h2>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              type="text"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          {/* Phone Field */}
          <div className="mb-4">
            <label className="block mb-2">Phone Number</label>
            <input
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10,15}$/,
                  message: "Invalid phone number",
                },
              })}
              className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
              type="tel"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>
          <div className="space-x-4">
            <button
              type="button"
              onClick={prevStep}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded transition duration-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition duration-300"
            >
              Submit Request
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default RequestForm;
