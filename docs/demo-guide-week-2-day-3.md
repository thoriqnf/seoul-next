# Developer Guide: CRUD Operations & Form Validation (Week 2 Day 3)

This guide covers integrating a Next.js client component with a Mock API (`https://64ca45bd700d50e3c7049e2f.mockapi.io/product`) to perform full CRUD operations (Create, Read, Update, Delete) and using `react-hook-form` to validate inputs before sending requests.

---

## 1. Roadmap of Exercises (`TODO CRUD 1` to `TODO CRUD 8`)

* **`TODO CRUD 1`**: Define the `Product` and `ProductFormInput` interfaces in `src/types/index.ts`.
* **`TODO CRUD 2`**: Add a client-side navigation link to the Products page in `src/components/Navigation.tsx`.
* **`TODO CRUD 3`**: Fetch products from MockAPI using `useEffect` with clean-up/abort controller.
* **`TODO CRUD 4`**: Initialize `useForm` from `react-hook-form` and set up defaults and control states.
* **`TODO CRUD 5`**: Register form inputs with validation constraints (name, price) and display inline error feedback.
* **`TODO CRUD 6`**: Implement the POST request inside the submit handler to add a new product.
* **`TODO CRUD 7`**: Implement the DELETE request to remove a product.
* **`TODO CRUD 8`**: Implement loading a product into Edit Mode and sending a PUT request on submit.

---

## 2. Product Schema & Types (`src/types/index.ts`)

### `TODO CRUD 1`: Defining Types
Define the product model matching the external mock API fields and specify the fields needed in the form:
```typescript
export interface Product {
  id: string;
  product: string;
  price: string;
  createdAt: string;
}

export interface ProductFormInput {
  product: string;
  price: string;
}
```

---

## 3. Navigation Update (`src/components/Navigation.tsx`)

### `TODO CRUD 2`: Navigation Link
Add the new route to the navigation bar using the client-side `<Link>` component:
```jsx
<Link
  href="/products"
  className="text-sm text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
>
  Products
</Link>
```

---

## 4. Reading Products (`src/app/products/page.tsx`)

### `TODO CRUD 3`: Fetching Products on Mount
Create a typed asynchronous `useEffect` that pulls products from MockAPI. Always clean up active network requests using `AbortController`:
```typescript
useEffect(() => {
  const abortController = new AbortController();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://64ca45bd700d50e3c7049e2f.mockapi.io/product", {
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message || "An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
  return () => abortController.abort();
}, []);
```

---

## 5. Setting Up Forms & Validation (`src/app/products/page.tsx`)

### `TODO CRUD 4`: Initialize the Hook
Use the `useForm` hook for uncontrolled form inputs and destruct the necessary controllers:
```typescript
const {
  register,
  handleSubmit,
  reset,
  setValue,
  formState: { errors },
} = useForm<ProductFormInput>({
  defaultValues: { product: "", price: "" },
});
```

### `TODO CRUD 5`: Register and Validate Inputs
Configure constraints on input fields and render validation warning text directly in the form:
```jsx
{/* Product Name Input */}
<input
  type="text"
  {...register("product", {
    required: "Product name is required",
    minLength: { value: 3, message: "Name must be at least 3 characters" },
  })}
/>
{errors.product && (
  <p className="text-red-500 text-xs mt-1">⚠ {errors.product.message}</p>
)}

{/* Product Price Input */}
<input
  type="number"
  step="0.01"
  {...register("price", {
    required: "Price is required",
    min: { value: 0.01, message: "Price must be greater than 0" },
  })}
/>
{errors.price && (
  <p className="text-red-500 text-xs mt-1">⚠ {errors.price.message}</p>
)}
```

---

## 6. Creating Products (POST)

### `TODO CRUD 6`: Adding a Product
Implement the API call to save a new item and append it to our local state array on success:
```typescript
const onSubmit = async (data: ProductFormInput) => {
  try {
    setActionLoading(true);
    
    const response = await fetch("https://64ca45bd700d50e3c7049e2f.mockapi.io/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed to add product");

    const newProduct: Product = await response.json();
    setProducts((prev) => [newProduct, ...prev]);
    reset(); // Clear input fields
  } catch (err: any) {
    alert(err.message || "Failed to create product");
  } finally {
    setActionLoading(false);
  }
};
```

---

## 7. Deleting Products (DELETE)

### `TODO CRUD 7`: Removing a Product
Send a DELETE request containing the product's unique `id`, and filter it out of local state:
```typescript
const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    setActionLoading(true);
    const response = await fetch(`https://64ca45bd700d50e3c7049e2f.mockapi.io/product/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error("Failed to delete product");

    setProducts((prev) => prev.filter((p) => p.id !== id));
  } catch (err: any) {
    alert(err.message || "Failed to delete product");
  } finally {
    setActionLoading(false);
  }
};
```

---

## 8. Updating Products (PUT)

### `TODO CRUD 8`: Entering Edit Mode and Saving Updates
When in editing mode, clicking submit runs a PUT request instead of a POST request:

1. **Enter Edit Mode (Populate Form):**
   ```typescript
   const startEdit = (product: Product) => {
     setEditingId(product.id);
     setValue("product", product.product);
     setValue("price", product.price);
   };
   ```

2. **Cancel Edit Mode:**
   ```typescript
   const cancelEdit = () => {
     setEditingId(null);
     reset();
   };
   ```

3. **Handle Submission (POST vs PUT):**
   ```typescript
   const onSubmit = async (data: ProductFormInput) => {
     try {
       setActionLoading(true);

       if (editingId) {
         // PUT Operation
         const response = await fetch(`https://64ca45bd700d50e3c7049e2f.mockapi.io/product/${editingId}`, {
           method: "PUT",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(data),
         });

         if (!response.ok) throw new Error("Failed to update product");

         const updatedProduct: Product = await response.json();
         setProducts((prev) =>
           prev.map((p) => (p.id === editingId ? updatedProduct : p))
         );
         setEditingId(null);
       } else {
         // POST Operation (Create)
         ...
       }
       reset();
     } catch (err: any) {
       alert(err.message || "Failed to save product");
     } finally {
       setActionLoading(false);
     }
   };
   ```
