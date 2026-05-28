"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
// TODO Form 5: Import useForm from "react-hook-form"

/**
 * ReactHookFormDemo (Starter Template)
 * Follow the steps in `docs/demo-guide-week-1-day-3.md` to complete:
 *
 * TODO Form 5: Import useForm from "react-hook-form"
 * TODO Form 6: Initialize useForm with defaultValues
 * TODO Form 7: Register input fields with validation rules
 * TODO Form 8: Connect onSubmit to handleSubmit validation sweep
 * TODO Form 9: Display validation error messages dynamically
 */
export default function ReactHookFormDemo() {
  // ----------------------------------------------------
  // TODO Form 6: Initialize useForm hook here.
  // Un-comment and complete the useForm hook below once imported:
  // ----------------------------------------------------

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

  // --- Starter Fallbacks (Delete these once useForm is un-commented) ---
  // const register = (name, options) => ({ name });
  // const handleSubmit = (onSubmitCallback) => (e) => {
  //   e.preventDefault();
  //   onSubmitCallback({ fullName: "Starter Name", email: "starter@example.com", age: "25" });
  // };
  // const errors = {};
  // const reset = () => {};
  // ---------------------------------------------------------------------

  const [submittedData, setSubmittedData] = useState(null);

  const onSubmits = (data) => {
    // disini masukan logic untuk post ke api
    setSubmittedData(data);
    reset();
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "20px 0",
      }}
    >
      <h2>Demo 2: Form Handling with React Hook Form</h2>
      <p style={{ marginBottom: "16px" }}>
        React Hook Form avoids re-rendering the whole page on every keystroke
        and makes validation incredibly simple.
      </p>

      {/* TODO Form 8: Wrap onSubmit in handleSubmit */}
      <form
        onSubmit={handleSubmit(onSubmits)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          maxWidth: "400px",
        }}
      >
        {/* Full Name Input */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "4px",
              fontWeight: "bold",
            }}
          >
            Full Name:
          </label>
          <input
            type="text"
            style={{
              padding: "8px",
              width: "100%",
              border: errors.fullName ? "1px solid #dc2626" : "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="e.g. Jane Doe"
            // TODO Form 7: Register this input with validation rules (required, minLength: 3)
            {...register("fullName", {
              required: "Full name harus isi",
              minLength: {
                value: 3,
                message: "Full name minimal 3 huruf",
              },
            })}
          />
          {/* TODO Form 9: Render fullName error message dynamically */}
          {errors.fullName && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "0.875rem",
                marginTop: "4px",
              }}
            >
              ⚠ {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "4px",
              fontWeight: "bold",
            }}
          >
            Email Address:
          </label>
          <input
            type="text"
            style={{
              padding: "8px",
              width: "100%",
              border: errors.email ? "1px solid #dc2626" : "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="e.g. jane@example.com"
            // TODO Form 7: Register this input with validation rules (required, email regex pattern)
            {...register("email")}
          />
          {/* TODO Form 9: Render email error message dynamically */}
          {errors.email && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "0.875rem",
                marginTop: "4px",
              }}
            >
              ⚠ {errors.email.message}
            </p>
          )}
        </div>

        {/* Age Input */}
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "4px",
              fontWeight: "bold",
            }}
          >
            Age:
          </label>
          <input
            type="number"
            style={{
              padding: "8px",
              width: "100%",
              border: errors.age ? "1px solid #dc2626" : "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="e.g. 25"
            // TODO Form 7: Register this input with validation rules (required, min: 18, max: 120)
            {...register("age")}
          />
          {/* TODO Form 9: Render age error message dynamically */}
          {errors.age && (
            <p
              style={{
                color: "#dc2626",
                fontSize: "0.875rem",
                marginTop: "4px",
              }}
            >
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
            fontWeight: "bold",
          }}
        >
          Submit with React Hook Form
        </button>
      </form>

      {submittedData && (
        <div
          style={{
            marginTop: "16px",
            padding: "12px",
            backgroundColor: "#ecfdf5",
            borderRadius: "4px",
            border: "1px solid #10b981",
          }}
        >
          <h4 style={{ color: "#065f46", margin: "0 0 8px 0" }}>
            ✓ Form Submitted Successfully!
          </h4>
          <p>
            <strong>Full Name:</strong> {submittedData.fullName}
          </p>
          <p>
            <strong>Email:</strong> {submittedData.email}
          </p>
          <p>
            <strong>Age:</strong> {submittedData.age}
          </p>
        </div>
      )}
    </div>
  );
}
