# Developer Guide: Next.js Components & Routing (Week 2 Day 2)

This guide covers extracting components with typed props, using Next.js routing (`Link`, `useRouter`), dynamic/nested folder parameters, and client-side private routing using `localStorage`.

---

## 1. Roadmap of Exercises (`TODO ROUTING 1` to `TODO ROUTING 8`)

* **`TODO ROUTING 1`**: Define the `TodoItemProps` interface in the child component.
* **`TODO ROUTING 2`**: Render `TodoItem` and pass down props from the main Todo list page.
* **`TODO ROUTING 3`**: Replace `<a>` tags with Next.js `<Link>` in the navigation bar to enable client-side routing.
* **`TODO ROUTING 4`**: Use `router.push` to programmatically redirect the user upon login.
* **`TODO ROUTING 5`**: Resolve the dynamic category route parameter inside `/posts/[category]/page.tsx`.
* **`TODO ROUTING 6`**: Resolve nested dynamic parameters (`category` and `id`) in `/posts/[category]/[id]/page.tsx`.
* **`TODO ROUTING 7`**: Protect `/dashboard` by verifying `isLoggedIn === "true"` in `localStorage` on mount.
* **`TODO ROUTING 8`**: Clear authentication state from `localStorage` and redirect to `/login` on logout.

---

## 2. Component Props Recap (`src/components/TodoItem.tsx`)

### `TODO ROUTING 1`: Defining Props Interface
Create `src/components/TodoItem.tsx` and define the properties that the component receives:
```typescript
import { Todo } from "@/types";

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  // JSX for the single todo item
}
```

### `TODO ROUTING 2`: Render and Pass Props
In `src/app/page.tsx`, import `<TodoItem />` and replace the inline list mapping:
```jsx
<TodoItem
  key={todo.id}
  todo={todo}
  onToggle={handleToggleTodo}
  onDelete={handleDeleteTodo}
/>
```

---

## 3. Link Navigation (`src/components/Navigation.tsx`)

### `TODO ROUTING 3`: Next.js Link
Use `<Link href="...">` instead of standard anchor tags to enable SPA page transitions:
```jsx
import Link from "next/link";

<nav className="flex gap-4">
  <Link href="/">Home</Link>
  <Link href="/posts">Posts</Link>
  <Link href="/dashboard">Dashboard</Link>
</nav>
```

---

## 4. Programmatic Navigation (`src/app/login/page.tsx`)

### `TODO ROUTING 4`: router.push
Import and use `useRouter` from `next/navigation` for client-side redirection:
```typescript
import { useRouter } from "next/navigation";

const router = useRouter();

const handleLogin = (e: React.FormEvent) => {
  e.preventDefault();
  localStorage.setItem("isLoggedIn", "true");
  router.push("/dashboard");
};
```

---

## 5. Dynamic & Nested Routes (`src/app/posts/...`)

### `TODO ROUTING 5`: Dynamic Segment
Access dynamic route parameters from the resolved `params` promise:
```typescript
interface PageProps {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  // Filter and show posts matching the category
}
```

### `TODO ROUTING 6`: Nested Dynamic Segment
Access both folder segment variables from `params`:
```typescript
interface PageProps {
  params: Promise<{ category: string; id: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { category, id } = await params;
  // Look up and render post matching category & id
}
```

---

## 6. Private Route Protection (`src/app/dashboard/page.tsx`)

### `TODO ROUTING 7`: client-side authorization check
```typescript
useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    router.push("/login");
  } else {
    setIsChecking(false);
  }
}, [router]);
```

### `TODO ROUTING 8`: Logout handler
```typescript
const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  router.push("/login");
};
```

---

## 7. Error Handling & 404 Pages (`src/app/not-found.tsx`, `src/app/error.tsx`)

Next.js App Router provides built-in support for custom 404 (Not Found) and error boundary pages at any route segment:
* **`not-found.tsx`**: Rendered automatically when a route is not matched, or when `notFound()` is programmatically invoked.
* **`error.tsx`**: Must be a Client Component (`"use client"`) that acts as an error boundary to gracefully display rendering errors without crashing the whole application.

