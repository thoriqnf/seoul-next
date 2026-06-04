# Developer Guide: Week 2 Day 4 Recap Project (Flower Shop)

This guide walks you through building a cohesive, beginner-friendly **Flower Shop** client catalog and administrative dashboard. The project recaps everything you have learned from Week 1 Day 3 to Week 2 Day 3 in **14 progressive steps**.

---

## Learning Objectives & Topics Covered

1. **React Event Handlers & Controlled Inputs** (Week 1 Day 3)
2. **Next.js Data Fetching & Network Cleanups** (Week 1 Day 4)
3. **Next.js with TypeScript & Generic Typings** (Week 2 Day 1)
4. **Next.js Client Routing, Layouts & Route Protection** (Week 2 Day 2)
5. **Axios Integration, React Hook Form, Input Validation, & CRUD** (Week 2 Day 3)

---

## Step-by-Step Task Walkthrough

### Phase 1: React State & Events (Catalog Page)
Path: `src/app/page.tsx`

#### Step 1 (`// TODO RECAP 1`): Controlled Search Input
Binds a standard HTML text input's value and `onChange` handler to a React state variable. This enables real-time client-side keyword matches.
1. Define the state:
```typescript
const [searchKeyword, setSearchKeyword] = useState<string>("");
```
2. Bind to the input tag in the JSX:
```jsx
<input
  type="text"
  placeholder="Search flowers..."
  value={searchKeyword}
  onChange={(e) => setSearchKeyword(e.target.value)}
  className="input-field"
/>
```

#### Step 2 (`// TODO RECAP 2`): Category Filter Tabs
Updates an active category state when user clicks on a category button (e.g., "Roses", "Lilies", etc.).
1. Define the state:
```typescript
const [activeCategory, setActiveCategory] = useState<FlowerCategory>("all");
```
2. Configure buttons to trigger state modifications:
```jsx
<button
  onClick={() => setActiveCategory("Roses")}
  className={activeCategory === "Roses" ? "bg-indigo-600 text-white shadow-sm" : "..."}
>
  Roses
</button>
```

---

### Phase 2: Asynchronous Data Fetching & TypeScript (Catalog Page)
Path: `src/app/page.tsx`

#### Step 3 (`// TODO RECAP 3`): Data Fetching on Mount
Fetches the entire flower catalog from the API when the component first renders, managing `loading`, `error`, and `flowers` array states.
```typescript
useEffect(() => {
  const fetchFlowers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<Flower[]>("https://64ca45bd700d50e3c7049e2f.mockapi.io/flowers");
      setFlowers(response.data);
    } catch (err: any) {
      setError(err.message || "Failed to load flowers.");
    } finally {
      setLoading(false);
    }
  };

  fetchFlowers();
}, []);
```

#### Step 4 (`// TODO RECAP 4`): AbortController Cleanup
Prevents memory leaks and state updates on unmounted components by returning a clean-up handler to abort active fetches.
1. Instantiate the AbortController at the beginning of the effect:
```typescript
const abortController = new AbortController();
```
2. Pass the cancellation signal as options to the Axios request:
```typescript
const response = await axios.get<Flower[]>(API_URL, {
  signal: abortController.signal,
});
```
3. Return the cleanup function:
```typescript
return () => {
  abortController.abort();
};
```

---

### Phase 3: Client Routing & Page Guards
Paths: `src/components/Navigation.tsx`, `src/app/login/page.tsx`, `src/app/flowers/[category]/[id]/page.tsx`, `src/app/dashboard/page.tsx`

#### Step 5 (`// TODO RECAP 5`): Next.js Link Navigation
*File: `src/components/Navigation.tsx`*
Enables Single Page Application (SPA) fast routing by replacing generic anchor tags (`<a>`) with Next.js `<Link>` components:
```jsx
import Link from "next/link";

<Link href="/dashboard" className="text-sm font-semibold hover:text-indigo-600">
  Admin Panel
</Link>
```

#### Step 6 (`// TODO RECAP 6`): Programmatic Redirections
*File: `src/app/login/page.tsx`*
Forcibly navigates the client browser after a login action without full page reloads:
1. Initialize the router:
```typescript
const router = useRouter();
```
2. Redirect after setting item in localStorage:
```typescript
localStorage.setItem("isLoggedIn", "true");
router.push("/dashboard");
```

#### Step 7 (`// TODO RECAP 7`): Resolve Dynamic Segment Promises
*File: `src/app/flowers/[category]/[id]/page.tsx`*
Resolves dynamic segment promises in client components:
```typescript
const [resolvedParams, setResolvedParams] = useState<{ category: string; id: string } | null>(null);

useEffect(() => {
  params.then((res) => setResolvedParams(res));
}, [params]);
```

#### Step 8 (`// TODO RECAP 8`): Dependency-Tracked Detail Fetching
*File: `src/app/flowers/[category]/[id]/page.tsx`*
Fetches single flower detail objects only when the resolved ID parameters change:
```typescript
useEffect(() => {
  if (!resolvedParams?.id) return;
  // Fetch flower details from `/flowers/${resolvedParams.id}` with loading, error, and abort controller.
}, [resolvedParams?.id]);
```

#### Step 9 (`// TODO RECAP 9`): Administrative Client Guards
*File: `src/app/dashboard/page.tsx`*
Protects user panels by verifying session credentials from local storage. Non-authenticated sessions are redirected:
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

---

### Phase 4: React Hook Form & Axios CRUD (Dashboard Page)
Path: `src/app/dashboard/page.tsx`

#### Step 10 (`// TODO RECAP 10`): Initialize Form Hooks
Creates uncontrolled form hook instances bound to typescript models with default values configuration:
```typescript
const {
  register,
  handleSubmit,
  setValue,
  reset,
  formState: { errors },
} = useForm<FlowerFormInput>({
  defaultValues: { name: "", price: 0, category: "Roses", description: "", image: "" },
});
```

#### Step 11 (`// TODO RECAP 11`): Register Form Validations
Configures input field limits (e.g. required field bounds, minLength, numerical min values) and prints error feedbacks:
```jsx
<input
  type="text"
  {...register("name", {
    required: "Flower name is required",
    minLength: { value: 3, message: "Name must be at least 3 characters" },
  })}
  className="input-field"
/>
{errors.name && <p className="input-error">⚠ {errors.name.message}</p>}
```

#### Step 12 (`// TODO RECAP 12`): Implement POST Request (Create)
Saves new listings to the database API and appends the returned objects to the client array state:
```typescript
const response = await axios.post<Flower>(API_URL, payload);
setFlowers((prev) => [response.data, ...prev]);
reset();
```

#### Step 13 (`// TODO RECAP 13`): Implement PUT Request (Update / Edit Mode)
Loads records into inputs to update active entries on the API when editing mode is enabled:
1. Load form fields:
```typescript
const startEdit = (flower: Flower) => {
  setEditingId(flower.id);
  setValue("name", flower.name);
  // ...other fields
};
```
2. Trigger Axios PUT request on submit:
```typescript
const response = await axios.put<Flower>(`${API_URL}/${editingId}`, payload);
setFlowers((prev) =>
  prev.map((flower) => (flower.id === editingId ? response.data : flower))
);
setEditingId(null);
reset();
```

#### Step 14 (`// TODO RECAP 14`): Implement DELETE Request
Fires DELETE requests to remove entries from the server and excludes the deleted objects from local array lists on confirmation:
```typescript
if (confirm("Are you sure?")) {
  await axios.delete(`${API_URL}/${id}`);
  setFlowers((prev) => prev.filter((f) => f.id !== id));
}
```

---

## How to Test & Verify

1. **Verify build is clean**:
   ```bash
   npm run build
   ```
2. **Launch dev server**:
   ```bash
   npm run dev
   ```
3. Test catalog searches, category filters, detail pages, authentication redirects, and dashboard CRUD additions/edits/deletions.
