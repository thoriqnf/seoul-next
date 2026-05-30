# Developer Guide: Advanced Form Handling & React Hook Form (Week 1 Day 4)

This document provides a technical walkthrough of the demonstration components included in Week 1 Day 4, focusing on advanced state callback updates, dynamic multi-field handlers, form reset capabilities, and integrating React Hook Form with local language validation constraints.

---

## 1. Advanced Events & Controlled Resets (`BasicFormDemo.jsx`)
Path: `src/components/Demo/BasicFormDemo.jsx`

This component builds on standard React events to demonstrate dynamic state updating and controlled form resetting.

### Running the Dev Server
Start the local server to test interactions in real-time:
```bash
bun dev
# or
npm run dev
```
Navigate to `http://localhost:3000`.

### TODO Form 1: State Callback Increments (`onClick`)
Instead of referencing `clickCount` directly inside `setClickCount(clickCount + 1)`—which can cause stale state bugs during rapid clicks—we use a functional update callback.

1. Locate `TODO Form 1` in `BasicFormDemo.jsx`.
2. Define the increment logic using a functional state callback:
```javascript
const [clickCount, setClickCount] = useState(100);

const handleButtonClick = () => {
  setClickCount((previous) => previous + 1); // Recommended approach to prevent stale state
};
```
3. Attach this handler to the `<button>` element in the JSX.

---

### TODO Form 2: Controlled Input (`onChange`)
Captures real-time keypress events and mirrors the input value back into a single text state.

1. Locate `TODO Form 2` in `BasicFormDemo.jsx`.
2. Implement the text state and handler:
```javascript
const [text, setText] = useState("");

const handleTextChange = (event) => {
  setText(event.target.value);
};
```
3. Hook them to the `<input>` element:
```jsx
<input type="text" value={text} onChange={handleTextChange} />
```

---

### TODO Form 3: Centralized Multi-field Handler
Instead of managing distinct state variables for every field, we map them into a single consolidated object. We update fields dynamically using their HTML `name` property.

1. Locate `TODO Form 3` in `BasicFormDemo.jsx`.
2. Implement the centralized handler:
```javascript
const [formData, setFormData] = useState({
  username: "",
  email: "",
  favoriteColor: "blue",
});

const handleFormChange = (event) => {
  setFormData((previous) => ({
    ...previous,
    [event.target.name]: event.target.value, // Dynamically maps name attribute to state key
  }));
};
```
3. Bind the fields to the change handler in the JSX:
```jsx
<input name="username" value={formData.username} onChange={handleFormChange} />
<input name="email" value={formData.email} onChange={handleFormChange} />
<select name="favoriteColor" value={formData.favoriteColor} onChange={handleFormChange}>
  ...
</select>
```

---

### Form Reset Capability
Demonstrates how to clear all form fields back to their default values when a user clicks the reset button.

1. Define the reset handler:
```javascript
const handleReset = (event) => {
  event.preventDefault(); // Prevents default browser reload behavior
  setFormData({
    username: "",
    email: "",
    favoriteColor: "blue",
  });
};
```
2. Attach it to the `<form>` wrapper using `onReset` and add a reset type button:
```jsx
<form onSubmit={handleFormSubmit} onReset={handleReset}>
  ...
  <button type="reset">reset</button>
</form>
```

---

### TODO Form 4: Form Submission (`onSubmit`)
Overrides standard browser POST behavior to handle submit operations cleanly in-memory.

1. Locate `TODO Form 4` in `BasicFormDemo.jsx`.
2. Implement the submit handler:
```javascript
const [submittedData, setSubmittedData] = useState(null);

const handleFormSubmit = (event) => {
  event.preventDefault(); // Stop standard browser page refresh
  setSubmittedData({ ...formData });
};
```
3. Hook it to the `<form>` wrapper:
```jsx
<form onSubmit={handleFormSubmit}>
  ...
</form>
```

---

## 2. Dynamic Input Validation with Localized Messages (`ReactHookFormDemo.jsx`)
Path: `src/components/Demo/ReactHookFormDemo.jsx`

This component uses `react-hook-form` to bypass standard controlled re-render cycles and implement performant validations with custom Indonesian error messages.

### TODO Form 5: Installation & Import
1. Verify `react-hook-form` is installed in your package file. If not, install it:
```bash
bun install react-hook-form
# or
npm install react-hook-form
```
2. Locate `TODO Form 5` at the top of `ReactHookFormDemo.jsx` and import:
```javascript
import { useForm } from "react-hook-form";
```

---

### TODO Form 6: Initializing the Hook & Deleting Fallbacks
1. Locate `TODO Form 6` in `ReactHookFormDemo.jsx`.
2. Un-comment and initialize the `useForm` hook with default fields:
```javascript
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm({
  defaultValues: {
    fullName: "",
    email: "",
    age: "",
  },
});
```
3. **Delete or comment out** the starter fallbacks block underneath the hook.

---

### TODO Form 7: Registering Fields & Validation Rules
The `register` helper configures dynamic validations. In this lecture, we validate `fullName` with custom Indonesian constraints.

1. Locate `TODO Form 7` in the input tags of `ReactHookFormDemo.jsx`.
2. Bind and configure validation rules:
```jsx
{/* Full Name Input: Required & MinLength */}
<input
  type="text"
  {...register("fullName", {
    required: "Full name harus isi",
    minLength: {
      value: 3,
      message: "Full name minimal 3 huruf",
    },
  })}
/>

{/* Email Input */}
<input type="text" {...register("email")} />

{/* Age Input */}
<input type="number" {...register("age")} />
```

---

### TODO Form 8 & 9: Form Submission & Errors
1. Wrap the submit event inside `handleSubmit` pointing to the `onSubmits` handler:
```jsx
<form onSubmit={handleSubmit(onSubmits)}>
  ...
</form>
```
2. Render error messages dynamically:
```jsx
{errors.fullName && (
  <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "4px" }}>
    ⚠ {errors.fullName.message}
  </p>
)}
```

---

## Guidelines Summary
- Use functional update state callbacks (`setCount((prev) => prev + 1)`) to avoid stale state bugs.
- Group multiple inputs into a single object and use dynamic property keys (`[name]: value`) to keep handlers lightweight.
- Use `react-hook-form` to drastically optimize rendering performance for validation-heavy screens.
