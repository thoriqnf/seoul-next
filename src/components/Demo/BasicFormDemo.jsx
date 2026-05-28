"use client";

import { useState } from "react";

/**
 * BasicFormDemo (Starter Template)
 * Follow the steps in `docs/demo-guide-week-1-day-3.md` to complete:
 * 
 * TODO Form 1: Implement onClick event
 * TODO Form 2: Implement onChange event (single state)
 * TODO Form 3: Implement onChange event (multiple inputs using one state object)
 * TODO Form 4: Implement onSubmit event with preventDefault
 */
export default function BasicFormDemo() {
  // ----------------------------------------------------
  // TODO Form 1: Implement clickCount state & increment handler
  // ----------------------------------------------------
  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    // Write logic here
  };

  // ----------------------------------------------------
  // TODO Form 2: Implement text state & single input handler
  // ----------------------------------------------------
  const [text, setText] = useState("");

  const handleTextChange = (e) => {
    // Write logic here
  };

  // ----------------------------------------------------
  // TODO Form 3: Implement form state & multi-input handler
  // ----------------------------------------------------
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    favoriteColor: "blue",
  });

  const handleFormChange = (e) => {
    // Write logic here to update the state using input `name` dynamically
  };

  // ----------------------------------------------------
  // TODO Form 4: Implement submit handler with preventDefault
  // ----------------------------------------------------
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSubmit = (e) => {
    // Write logic here to prevent default browser behavior and set submittedData
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px", margin: "20px 0" }}>
      <h2>Demo 1: Basic Events & State Forms</h2>

      {/* onClick Section */}
      <section style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px dashed #eee" }}>
        <h3>1. onClick Event</h3>
        <p>Click the button below to increment the count:</p>
        <button 
          onClick={handleButtonClick}
          style={{ padding: "8px 16px", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
        >
          Clicked {clickCount} times
        </button>
      </section>

      {/* onChange (Single Input) Section */}
      <section style={{ marginBottom: "24px", paddingBottom: "16px", borderBottom: "1px dashed #eee" }}>
        <h3>2. onChange Event (Single Input State)</h3>
        <p>Type below to see the text mirrored in real-time:</p>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          placeholder="Type something here..."
          style={{ padding: "8px", width: "100%", maxWidth: "300px", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "8px" }}
        />
        {text && <p><strong>Live Output:</strong> {text}</p>}
      </section>

      {/* onChange (Multi-field, 1 State Object) & onSubmit Section */}
      <section style={{ marginBottom: "16px" }}>
        <h3>3 & 4. onChange with Multi-fields & onSubmit</h3>
        <p>Fill out the fields below. Notice how all inputs use a single state object.</p>

        <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "400px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleFormChange}
              placeholder="e.g. johndoe"
              style={{ padding: "8px", width: "100%", border: "1px solid #ccc", borderRadius: "4px" }}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Email Address:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="e.g. john@example.com"
              style={{ padding: "8px", width: "100%", border: "1px solid #ccc", borderRadius: "4px" }}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Favorite Color:</label>
            <select
              name="favoriteColor"
              value={formData.favoriteColor}
              onChange={handleFormChange}
              style={{ padding: "8px", width: "100%", border: "1px solid #ccc", borderRadius: "4px" }}
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="purple">Purple</option>
            </select>
          </div>

          <button
            type="submit"
            style={{ padding: "10px 16px", backgroundColor: "#10b981", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
          >
            Submit Form
          </button>
        </form>

        {submittedData && (
          <div style={{ marginTop: "16px", padding: "12px", backgroundColor: "#f3f4f6", borderRadius: "4px", border: "1px solid #e5e7eb" }}>
            <h4>Submitted Data (Logged from State):</h4>
            <p><strong>Username:</strong> {submittedData.username}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Favorite Color:</strong> {submittedData.favoriteColor}</p>
          </div>
        )}
      </section>
    </div>
  );
}
