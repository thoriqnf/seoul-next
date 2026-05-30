"use client";

import { useState, useEffect } from "react";

/**
 * GetPostByIdDemo
 * Mendemonstrasikan penggunaan useEffect dengan array dependensi:
 * Mengambil (fetching) detail postingan berdasarkan ID yang dipilih.
 * Array dependensi berisi [postId], sehingga effect akan dipicu kembali
 * setiap kali nilai `postId` berubah.
 */
export default function GetPostByIdDemo() {
  // ----------------------------------------------------
  // 1. State Declarations
  // ----------------------------------------------------
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----------------------------------------------------
  // 2. useEffect Handler (Reacting to State Changes)
  // ----------------------------------------------------
  useEffect(() => {
    // Jalankan setiap kali `postId` berubah
    setLoading(true);
    setError(null);

    fetch(`https://dummyjson.com/posts/${postId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Postingan dengan ID ${postId} tidak ditemukan`);
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [postId]); // [postId] Menandakan effect berjalan ulang jika postId berubah

  // ----------------------------------------------------
  // 3. User Actions / Interaction Handlers
  // ----------------------------------------------------
  const handleNext = () => {
    setPostId((prev) => prev + 1);
  };

  const handlePrev = () => {
    setPostId((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // ----------------------------------------------------
  // 4. UI / Component Render
  // ----------------------------------------------------
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: "20px 0",
        backgroundColor: "#fff",
      }}
    >
      <h3 style={{ margin: "0 0 10px 0", color: "#1a202c" }}>
        Demo 4: Ambil Postingan Berdasarkan ID (useEffect with Dependency)
      </h3>
      <p style={{ fontSize: "0.9rem", color: "#4a5568", marginBottom: "15px" }}>
        Component ini mendemonstrasikan bagaimana `useEffect` merespons perubahan state `postId` dengan menyertakannya dalam array dependensi `[postId]`.
      </p>

      {/* Navigasi ID Postingan */}
      <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
        <button
          onClick={handlePrev}
          disabled={postId <= 1}
          style={{
            padding: "8px 16px",
            backgroundColor: postId <= 1 ? "#cbd5e0" : "#3182ce",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: postId <= 1 ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          Sebelumnya
        </button>

        <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#2d3748" }}>
          ID Postingan: {postId}
        </span>

        <button
          onClick={handleNext}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3182ce",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Selanjutnya
        </button>
      </div>

      {/* Konten detail postingan */}
      <div style={{ minHeight: "120px", padding: "15px", border: "1px dashed #e2e8f0", borderRadius: "6px" }}>
        {loading ? (
          <p style={{ color: "#3182ce", fontWeight: "bold", margin: 0 }}>Memuat detail postingan...</p>
        ) : error ? (
          <p style={{ color: "#e53e3e", margin: 0 }}>⚠ Error: {error}</p>
        ) : post ? (
          <div style={{ margin: 0 }}>
            <h4 style={{ margin: "0 0 8px 0", color: "#2d3748", fontSize: "1.1rem" }}>
              {post.title}
            </h4>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#4a5568", lineHeight: "1.5" }}>
              {post.body}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
