"use client";

import { useState, useEffect } from "react";

/**
 * GetAllPostsDemo
 * Mendemonstrasikan penggunaan useEffect paling dasar:
 * Mengambil (fetching) data dari API satu kali pada saat component pertama kali dimuat (mount).
 * Menggunakan array dependensi kosong [] agar effect hanya berjalan sekali.
 */
export default function GetAllPostsDemo() {
  // ----------------------------------------------------
  // 1. State Declarations
  // ----------------------------------------------------
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ----------------------------------------------------
  // 2. useEffect Handler (Fetch on Mount)
  // ----------------------------------------------------
  useEffect(() => {
    // Memulai proses fetching data
    fetch("https://dummyjson.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal mengambil data dari server");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data.posts || []); // Menyimpan data postingan ke state
        setLoading(false); // Menghentikan loading indicator
      })
      .catch((err) => {
        setError(err.message); // Menyimpan pesan error jika terjadi kegagalan
        setLoading(false); // Menghentikan loading indicator
      });
  }, []); // [] Menandakan effect ini hanya dipanggil sekali saat mount

  // ----------------------------------------------------
  // 3. UI / Component Render
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
        Demo 3: Ambil Semua Postingan (useEffect on Mount)
      </h3>
      <p style={{ fontSize: "0.9rem", color: "#4a5568", marginBottom: "15px" }}>
        Component ini mendemonstrasikan cara melakukan request API menggunakan `useEffect` dengan array dependensi kosong `[]`.
      </p>

      {loading ? (
        <p style={{ color: "#3182ce", fontWeight: "bold" }}>Memuat postingan...</p>
      ) : error ? (
        <p style={{ color: "#e53e3e" }}>⚠ Error: {error}</p>
      ) : posts.length === 0 ? (
        <p>Tidak ada postingan yang ditemukan.</p>
      ) : (
        <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "5px" }}>
          <ul style={{ paddingLeft: "20px", margin: 0 }}>
            {posts.map((post) => (
              <li key={post.id} style={{ marginBottom: "12px", borderBottom: "1px solid #edf2f7", paddingBottom: "8px" }}>
                <strong style={{ display: "block", color: "#2d3748" }}>
                  {post.id}. {post.title}
                </strong>
                <span style={{ fontSize: "0.85rem", color: "#718096" }}>
                  {post.body.substring(0, 100)}...
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
