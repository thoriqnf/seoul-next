# Developer Guide: Next.js Components & Routing (Week 2 Day 2)

This developer guide provides a technical walkthrough of the demonstration components for Week 2 Day 2. In this lecture, we learn how to extract React components with typed props, use Next.js routing (`Link`, `useRouter`), work with dynamic and nested routing parameters, and build a simple client-side private route using `localStorage`.

To ensure a smooth learning experience, the material is split into a few clean routes/components and broken down into **8 beginner-friendly sequential tasks**, all styled exclusively using **TailwindCSS**.

---

## 1. Roadmap of Exercises (`TODO ROUTING 1` to `TODO ROUTING 8`)

The curriculum is structured progressively, starting from TypeScript prop interfaces and moving to dynamic nested routing parameters and state-based navigation guards:

* **`TODO ROUTING 1`** *(Easy)*: Define the `TodoItemProps` interface and typed parameters for the extracted `TodoItem` component.
* **`TODO ROUTING 2`** *(Easy)*: Import, render, and pass down typed props to `TodoItem` inside the main Home page.
* **`TODO ROUTING 3`** *(Medium)*: Implement a global navigation header in `layout.tsx` using Next.js `<Link>` component.
* **`TODO ROUTING 4`** *(Medium)*: Implement programmatic routing using `router.push` in the `/login` form handler.
* **`TODO ROUTING 5`** *(Medium)*: Access dynamic category route parameters inside `/posts/[category]` using dynamic route params.
* **`TODO ROUTING 6`** *(Hard)*: Extract multiple dynamic segments (`category` and `id`) in `/posts/[category]/[id]` to display nested detail views.
* **`TODO ROUTING 7`** *(Hard)*: Protect `/dashboard` by checking authentication status in local storage and redirecting unauthorized requests.
* **`TODO ROUTING 8`** *(Hard)*: Implement logout handler to clear authentication state and programmatically redirect the user to `/login`.

---

## 2. Component Props Recap with TypeScript (`src/components/TodoItem.tsx`)

### `TODO ROUTING 1`: Defining Component Prop interfaces
In TypeScript, we define an `interface` to declare what properties a component expects:
```typescript
import { Todo } from "@/types";

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  // Return the JSX for a single todo item
}
```

### `TODO ROUTING 2`: Render component and pass props
In the main page file (`src/app/page.tsx`), replace the inline mapping code with the typed child component:
```jsx
<TodoItem
  key={todo.id}
  todo={todo}
  onToggle={handleToggleTodo}
  onDelete={handleDeleteTodo}
/>
```

---

## 3. Basic Routing & Global Layout (`src/app/layout.tsx`)

### `TODO ROUTING 3`: Next.js Link Component
Next.js provides `<Link href="...">` to enable client-side navigation. It performs faster transition between routes without full page reloads:
```jsx
import Link from "next/link";

// In layout header
<nav className="flex gap-4">
  <Link href="/" className="text-slate-600 dark:text-zinc-400 hover:text-indigo-600 font-medium">Home</Link>
  <Link href="/posts" className="text-slate-600 dark:text-zinc-400 hover:text-indigo-600 font-medium">Posts</Link>
  <Link href="/dashboard" className="text-slate-600 dark:text-zinc-400 hover:text-indigo-600 font-medium">Dashboard</Link>
</nav>
```

---

## 4. Programmatic Navigation (`src/app/login/page.tsx`)

### `TODO ROUTING 4`: router.push
Programmatic navigation means changing routes based on event triggers (like submitting a form or completing an action). We use the `useRouter` hook from `next/navigation`:
```typescript
import { useRouter } from "next/navigation";

const router = useRouter();

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  // ... auth checks ...
  localStorage.setItem("isLoggedIn", "true");
  router.push("/dashboard");
};
```

---

## 5. Dynamic and Nested Routes (`src/app/posts/...`)

### Folder Structure
Next.js uses file-system routing. Folders inside brackets `[parameterName]` create dynamic routes:
- `src/app/posts/page.tsx` -> `/posts` (list categories)
- `src/app/posts/[category]/page.tsx` -> `/posts/tech` (dynamic category)
- `src/app/posts/[category]/[id]/page.tsx` -> `/posts/tech/1` (nested dynamic category & id)

### `TODO ROUTING 5`: Dynamic Route Parameter
Inside `src/app/posts/[category]/page.tsx`, you can access the dynamic route param:
```typescript
interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  // Use 'category' in components...
}
```

### `TODO ROUTING 6`: Nested Dynamic Route Parameters
Inside `src/app/posts/[category]/[id]/page.tsx`, both dynamic parameters are accessible in `params`:
```typescript
interface PageProps {
  params: Promise<{ category: string; id: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { category, id } = await params;
  // Fetch or lookup details for category and id...
}
```

---

## 6. Private Route Protection & Local Storage (`src/app/dashboard/page.tsx`)

To secure routes on the client side, we check if the user credentials exist in `localStorage` inside a `useEffect` hook, and redirect them to `/login` if not.

### `TODO ROUTING 7`: Auth Check and Redirect
```typescript
useEffect(() => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  if (loggedIn !== "true") {
    router.push("/login");
  } else {
    setIsChecking(false);
  }
}, [router]);
```

### `TODO ROUTING 8`: Programmatic Logout
```typescript
const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  router.push("/login");
};
```

---

## 7. How to Run & Verify

1. Run the local package installer:
   ```bash
   bun install # or npm install
   ```
2. Start the development server:
   ```bash
   bun dev # or npm run dev
   ```
3. Open `http://localhost:3000` to verify:
   * Home Todo actions work.
   * Navbar navigation is functional.
   * `/posts` pages list posts correctly, and `/posts/tech/1` works.
   * `/dashboard` redirects to `/login` if unauthenticated, and dashboard functions once logged in.
4. Verify production compilation:
   * `bun run build` (or `npm run build`) runs cleanly without errors.
