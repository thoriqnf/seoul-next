# Developer Guide: Data Fetching with `useEffect` (Week 1 Day 4)

This document provides a step-by-step walkthrough of the demonstration components for Week 1 Day 4. In this lecture, we learn how to fetch data from a REST API (`https://dummyjson.com/posts`) using the built-in React `useEffect` hook.

To ensure a smooth learning experience, the material is split into two clean components and broken down into **8 beginner-friendly sequential tasks**, all styled exclusively using **TailwindCSS**.

---

## 1. Fetching All Posts on Mount (`GetAllPostsDemo.jsx`)
Path: `src/components/Demo/GetAllPostsDemo.jsx`

This component teaches how to fetch a list of items once when the component is first rendered (mounted). We use an empty dependency array `[]`.

### TODO useEffect 1: Initialize State Variables
To manage data, loading, and error states, we define three standard state hooks.

1. Locate `TODO useEffect 1` in `GetAllPostsDemo.jsx`.
2. Define the states:
```javascript
const [posts, setPosts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

### TODO useEffect 2: Fetch Data on Component Mount
We trigger a simple `fetch` request inside `useEffect` and configure the dependency array as `[]` so that it only runs once.

1. Locate `TODO useEffect 2` in `GetAllPostsDemo.jsx`.
2. Write the fetch hook:
```javascript
useEffect(() => {
  fetch("https://dummyjson.com/posts")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Gagal mengambil data dari server");
      }
      return res.json();
    })
    .then((data) => {
      setPosts(data.posts || []);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, []); // Empty array ensures this only runs ONCE when component mounts
```

### TODO useEffect 3: Conditional Rendering for Loading & Errors
We render feedback elements based on the state values of `loading` and `error`.

1. Locate `TODO useEffect 3` in the JSX wrapper of `GetAllPostsDemo.jsx`.
2. Implement the conditional loading/error checks:
```jsx
{loading ? (
  <p className="text-blue-500 font-bold">Memuat postingan...</p>
) : error ? (
  <p className="text-red-500">⚠ Error: {error}</p>
) : posts.length === 0 ? (
  <p className="text-slate-500">Tidak ada postingan yang ditemukan.</p>
) : (
  /* List container here */
)}
```

### TODO useEffect 4: Rendering List Items dynamically (`posts.map`)
We map over the `posts` array and render a list item for each post.

1. Locate `TODO useEffect 4` in `GetAllPostsDemo.jsx`.
2. Write the mapping code inside the parent list element:
```jsx
<div className="max-h-[300px] overflow-y-auto pr-1">
  <ul className="list-disc pl-5 m-0">
    {posts.map((post) => (
      <li key={post.id} className="mb-3 border-b border-slate-100 pb-2">
        <strong className="block text-slate-800 text-sm font-semibold">
          {post.id}. {post.title}
        </strong>
        <span className="text-xs text-slate-500">
          {post.body.substring(0, 100)}...
        </span>
      </li>
    ))}
  </ul>
</div>
```

---

## 2. Fetching Single Items by ID (`GetPostByIdDemo.jsx`)
Path: `src/components/Demo/GetPostByIdDemo.jsx`

This component teaches how `useEffect` can react to state changes by listing `[postId]` inside its dependency array.

### TODO useEffect 5: Initialize Detail State Variables
We track the current `postId` we want to fetch, the returned `post` object, loading, and error states.

1. Locate `TODO useEffect 5` in `GetPostByIdDemo.jsx`.
2. Define the states:
```javascript
const [postId, setPostId] = useState(1);
const [post, setPost] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
```

### TODO useEffect 6: Define ID Navigation Handlers
We write helper functions to increment and decrement the ID.

1. Locate `TODO useEffect 6` in `GetPostByIdDemo.jsx`.
2. Write the handlers:
```javascript
const handleNext = () => {
  setPostId((prev) => prev + 1);
};

const handlePrev = () => {
  setPostId((prev) => (prev > 1 ? prev - 1 : 1)); // ID cannot go below 1
};
```

### TODO useEffect 7: Fetch Dynamic Data on State Changes
We write a `useEffect` hook that triggers a new `fetch` request every time `postId` changes.

1. Locate `TODO useEffect 7` in `GetPostByIdDemo.jsx`.
2. Write the dependency-tracked hook:
```javascript
useEffect(() => {
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
}, [postId]); // effect runs again whenever postId changes
```

### TODO useEffect 8: Render Selected Post Card
We conditionally render the detailed content card once the post data is successfully fetched.

1. Locate `TODO useEffect 8` in the JSX wrapper of `GetPostByIdDemo.jsx`.
2. Render the post detail:
```jsx
<div className="min-h-[120px] p-4 border border-dashed border-slate-200 rounded-lg bg-slate-50">
  {loading ? (
    <p className="text-blue-500 font-bold m-0">Memuat detail postingan...</p>
  ) : error ? (
    <p className="text-red-500 m-0">⚠ Error: {error}</p>
  ) : post ? (
    <div className="m-0">
      <h4 className="m-0 text-slate-800 text-base font-bold mb-2">
        {post.title}
      </h4>
      <p className="m-0 text-slate-600 text-sm leading-relaxed">
        {post.body}
      </p>
    </div>
  ) : null}
</div>
```

---

## 🌿 Summary of Best Practices
- **Empty Array `[]`:** Triggers once after the initial render. Ideal for general list loading.
- **Dependency List `[dependency]`:** Triggers every time the listed state or prop variable changes. Ideal for details drawers or dynamic pages.
- **Conditional Rendering:** Always check for `loading` and `error` states to prevent React from reading properties of `null` objects before they are fetched.
