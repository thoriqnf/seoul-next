# Developer Guide: Next.js with TypeScript (Week 2 Day 1)

This developer guide provides a technical walkthrough of the demonstration components included in this project, explaining how to utilize TypeScript **literal types, interfaces, typed state, typed effects, and typed event handlers** sequentially from easiest to hardest.

---

## 1. Roadmap of Exercises (`TODO TS 1` to `TODO TS 8`)

The curriculum is structured progressively, starting from basic type definitions and moving to advanced asynchronous event and hook lifecycles:

* **`TODO TS 1`** *(Easy)*: Define a literal string union type for filtering state (`TodoFilter`).
* **`TODO TS 2`** *(Easy)*: Define a structured model interface (`Todo`) for individual items.
* **`TODO TS 3`** *(Medium)*: Define the compound model interface (`DummyJsonTodoResponse`) representing an external API payload.
* **`TODO TS 4`** *(Medium)*: Enforce type parameters for primitive state hooks (`newTodoText`, `filter`, etc.).
* **`TODO TS 5`** *(Medium)*: Enforce type parameters for object lists in state (`todos`).
* **`TODO TS 6`** *(Medium)*: Type standard React SyntheticEvent handler arguments (`React.FormEvent`, `React.ChangeEvent`).
* **`TODO TS 7`** *(Hard)*: Cast parsed external API response JSON payloads inside asynchronous hooks.
* **`TODO TS 8`** *(Hard)*: Implement async effect cancellation and resource clean-up via the `AbortController` signal inside component unmounting phases.

---

## 2. Setting Up Types & Interfaces (`src/types/index.ts`)

### `TODO TS 1`: Literal Type Unions
Literal union types let you restrict string variables to a specific, predefined set of values:
```typescript
export type TodoFilter = 'all' | 'completed' | 'pending';
```

### `TODO TS 2`: Object Interfaces
An `interface` specifies the exact structure of an object:
```typescript
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}
```

### `TODO TS 3`: Complex API Interfaces
APIs often wrap their lists in pagination metadata. We mirror that exactly:
```typescript
export interface DummyJsonTodoResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}
```

---

## 3. Enforcing State Type Bounds (`src/app/page.tsx`)

### `TODO TS 4`: Primitive & Union States
For basic primitives, type bounds prevent assignment of invalid filter modes:
```typescript
const [newTodoText, setNewTodoText] = useState<string>("");
const [filter, setFilter] = useState<TodoFilter>("all");
```

### `TODO TS 5`: Object List States
For complex arrays, typescript prevents pushing objects that don't match the interface schema:
```typescript
const [todos, setTodos] = useState<Todo[]>([]);
```

---

## 4. Typed Asynchronous Effects (`src/app/page.tsx`)

Inside `useEffect`, we perform typecasting on raw API results and clean up active network requests.

### `TODO TS 7`: Cast Response
Standard `fetch` responses yield type `any` upon parsing. We explicitly cast this:
```typescript
const data: DummyJsonTodoResponse = await response.json();
setTodos(data.todos);
```

### `TODO TS 8`: Effect Clean-up (Cancel Active Fetch)
If a user quickly clicks away from the page while a fetch is active, we prevent memory leaks and state updates on unmounted components by returning a clean-up handler:
```typescript
return () => {
  abortController.abort(); // Cancel network request
};
```

---

## 5. Event Handling Typings (`src/app/page.tsx`)

### `TODO TS 6`: Typed React Form & Input Event Handler Parameters
When typing elements inline or in standalone methods:
```typescript
// Typed form submission SyntheticEvent
const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  ...
};

// Typed input tag onChange handler
onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodoText(e.target.value)}
```

---

## 6. How to Run & Verify

1. Run the local package installer:
   ```bash
   bun install # or npm install
   ```
2. Start the development server:
   ```bash
   bun dev # or npm run dev
   ```
3. Verify production compilation is error-free:
   ```bash
   bun run build # or npm run build
   ```
