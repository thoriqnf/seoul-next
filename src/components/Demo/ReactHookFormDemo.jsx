"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

/**
 * ReactHookFormDemo
 * Demonstrates:
 * 1. basic usage of useForm hook
 * 2. registering input elements
 * 3. basic validation rules: required, minLength, pattern (email validation)
 * 4. conditional error feedback UI
 */
export default function ReactHookFormDemo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      age: "",
    },
  });

  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    // data is fully validated and typed according to rules below
    setSubmittedData(data);
    reset(); // Reset form inputs after successful submission
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", margin: "20px 0" }}>
      <h2>Demo 2: Form Handling with React Hook Form</h2>
      <p style={{ marginBottom: "16px" }}>
        React Hook Form avoids re-rendering the whole page on every keystroke and makes validation incredibly simple.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
        {/* Full Name Input (Required & minLength validation) */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Full Name:</label>
          <input
            type="text"
            style={{ 
              padding: "8px", 
              width: "100%", 
              border: errors.fullName ? "1px solid #dc2626" : "1px solid #ccc", 
              borderRadius: "4px" 
            }}
            placeholder="e.g. Jane Doe"
            {...register("fullName", { 
              required: "Full name is required", 
              minLength: {
                value: 3,
                message: "Full name must be at least 3 characters long"
              }
            })}
          />
          {errors.fullName && (
            <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "4px", marginContent: 0 }}>
              ⚠ {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Input (Required & Regex pattern validation) */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Email Address:</label>
          <input
            type="text"
            style={{ 
              padding: "8px", 
              width: "100%", 
              border: errors.email ? "1px solid #dc2626" : "1px solid #ccc", 
              borderRadius: "4px" 
            }}
            placeholder="e.g. jane@example.com"
            {...register("email", { 
              required: "Email address is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address"
              }
            })}
          />
          {errors.email && (
            <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "4px" }}>
              ⚠ {errors.email.message}
            </p>
          )}
        </div>

        {/* Age Input (Required & custom numeric range validation) */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Age:</label>
          <input
            type="number"
            style={{ 
              padding: "8px", 
              width: "100%", 
              border: errors.age ? "1px solid #dc2626" : "1px solid #ccc", 
              borderRadius: "4px" 
            }}
            placeholder="e.g. 25"
            {...register("age", { 
              required: "Age is required",
              min: {
                value: 18,
                message: "You must be at least 18 years old"
              },
              max: {
                value: 120,
                message: "Please enter a valid age"
              }
            })}
          />
          {errors.age && (
            <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "4px" }}>
              ⚠ {errors.age.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{ 
            padding: "10px 16px", 
            backgroundColor: "#2563eb", 
            color: "#fff", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer", 
            fontWeight: "bold" 
          }}
        >
          Submit with React Hook Form
        </button>
      </form>

      {submittedData && (
        <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#ecfdf5", borderRadius: "4px", border: "1px solid #10b981" }}>
          <h4 style={{ color: "#065f46", margin: "0 0 8px 0" }}>✓ Form Submitted Successfully!</h4>
          <p><strong>Full Name:</strong> {submittedData.fullName}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
          <p><strong>Age:</strong> {submittedData.age}</p>
        </div>
      )}
    </div>
  );
}
