# Developer Guide: Next.js with TypeScript (Week 2 Day 1)

This developer guide provides an instructional walkthrough of the demonstration components included in this project, focusing on **TypeScript Interfaces & Types**, **typed React `useState` hooks**, and **typed React `useEffect` hooks** inside a Next.js environment using Tailwind CSS.

---

## 1. Core Concepts Covered

By building and studying this **Todo Dashboard**, students will learn:
1. **TypeScript Interfaces & Types:** How to declare data shapes using `interface` and custom type unions using `type`.
2. **Typed React State (`useState`):** How to supply explicit types to state variables like lists, inputs, and custom filter modes.
3. **Typed React Side Effects (`useEffect`):** How to type API request responses safely, handle loading/error states, and clean up subscriptions using browser `AbortController`.
4. **Typed Events:** How to type standard React form submission events and input change events.

---

## 2. Defining Interfaces & Union Types (`src/types/index.ts`)

Understanding the difference between `interface` and `type` is a fundamental starting point:
* **`interface`:** Used to define the structure/shape of objects. Perfect for models like `Todo` or API responses.
* **`type`:** More flexible. Primarily used to define custom unions (like `TodoFilter`), intersections, or primitive aliases.

### The Code (`src/types/index.ts`)

```typescript
// Define the shape of a single Todo item
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

// Define a type union for valid filter states
export type TodoFilter = 'all' | 'completed' | 'pending';

// Define the expected shape of the DummyJSON API response
export interface DummyJsonTodoResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}
```

---

## 3. Managing State with TypeScript (`useState`)

By default, React can sometimes infer the type of a state variable (e.g., `useState("")` infers `string`). However, for objects, lists, or union types, we must explicitly declare the expected type using generics:

```typescript
// 1. Array of Todo objects
const [todos, setTodos] = useState<Todo[]>([]);

// 2. Custom Type Union (only allows 'all', 'completed', or 'pending')
const [filter, setFilter] = useState<TodoFilter>("all");

// 3. Simple primitive states
const [newTodoText, setNewTodoText] = useState<string>("");
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
```

Explicit typing prevents students from accidentally assigning invalid data to states (e.g., setting `filter` to `"finished"`, which will trigger a compilation error).

---

## 4. API Fetching & Clean-up in `useEffect`

When fetching data from an external API, we must:
1. Parse the response JSON and typecast it to our helper interface (`DummyJsonTodoResponse`).
2. Implement clean-up logic to cancel outstanding requests if the component unmounts. This is done using standard browser `AbortController`.

### Typing & Fetching Code

```typescript
useEffect(() => {
  const abortController = new AbortController();

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("https://dummyjson.com/todos?limit=8", {
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }

      // Parse JSON as our typed response
      const data: DummyJsonTodoResponse = await response.json();
      setTodos(data.todos);
    } catch (err) {
      if (err instanceof Error) {
        // Suppress errors caused by aborting the request on unmount
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchTodos();

  // Return the cleanup function
  return () => {
    abortController.abort();
  };
}, []);
```

---

## 5. Typing React Event Handlers

React handles events via SyntheticEvents. When writing custom handler functions, we need to declare the correct event types:

### A. Form Submission Event (`React.FormEvent`)
Prevents page reload and handles form submission safely:
```typescript
const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!newTodoText.trim()) return;

  const newTodoItem: Todo = {
    id: Date.now(),
    todo: newTodoText.trim(),
    completed: false,
    userId: 1,
  };

  setTodos((prevTodos) => [newTodoItem, ...prevTodos]);
  setNewTodoText("");
};
```

### B. Input Change Event (`React.ChangeEvent`)
Captures keypress inputs:
```typescript
const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setNewTodoText(e.target.value);
};
```

---

## 6. How to Run the App

1. Ensure all packages are installed:
   ```bash
   npm install
   ```
2. Run the Next.js development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:3000` in your web browser.
