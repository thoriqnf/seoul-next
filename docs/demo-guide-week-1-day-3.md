# Developer Guide: React Events & React Hook Form

This document provides a technical walkthrough of the demonstration components included in this project, explaining controlled component states, basic browser event handlers, and integration with React Hook Form.

---

## 1. Controlled State & Event Handling (`BasicFormDemo.jsx`)
Path: `src/components/Demo/BasicFormDemo.jsx`

This component showcases standard React event registration and input state handling using built-in React hooks. **No additional installation is required.**

### Running the Dev Server
To test this component, start the Next.js local server:
```bash
bun dev
# or
npm run dev
```
Navigate to `http://localhost:3000`.

### TODO Form 1: Click Events (`onClick`)
Handles basic user click interactions by updating a numeric state variable.

1. Locate `TODO Form 1` in `BasicFormDemo.jsx`.
2. Define the increment logic inside `handleButtonClick`:
```javascript
const [clickCount, setClickCount] = useState(0);

const handleButtonClick = () => {
  setClickCount((prev) => prev + 1);
};
```
3. Attach it to the button element in the JSX:
```jsx
<button onClick={handleButtonClick}>
  Clicked {clickCount} times
</button>
```

### TODO Form 2: Controlled Inputs (`onChange`)
Listens to browser text input events to store current keyboard value into state.

1. Locate `TODO Form 2` in `BasicFormDemo.jsx`.
2. Bind the text input value and implement the handler:
```javascript
const [text, setText] = useState("");

const handleTextChange = (e) => {
  setText(e.target.value);
};
```
3. Hook them to the text input in the JSX:
```jsx
<input type="text" value={text} onChange={handleTextChange} />
```

### TODO Form 3: Centralized Form State (Multi-field `onChange`)
Instead of defining separate states for every form field, multiple inputs are combined into a single object. Field values are updated dynamically using the elements' `name` attribute.

1. Locate `TODO Form 3` in `BasicFormDemo.jsx`.
2. Update the dynamic property assignment inside `handleFormChange`:
```javascript
const [formData, setFormData] = useState({
  username: "",
  email: "",
  favoriteColor: "blue",
});

const handleFormChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
```
3. Verify the form fields contain correct `name`, `value`, and `onChange` attributes:
```jsx
<input name="username" value={formData.username} onChange={handleFormChange} />
<input name="email" value={formData.email} onChange={handleFormChange} />
```

### TODO Form 4: Form Submission (`onSubmit`)
Overrides standard HTML form behavior. The handler calls `preventDefault()` to prevent a browser page reload.

1. Locate `TODO Form 4` in `BasicFormDemo.jsx`.
2. Implement the submission handler:
```javascript
const handleFormSubmit = (e) => {
  e.preventDefault(); // Prevents page reload
  setSubmittedData({ ...formData });
};
```
3. Bind the handler to the `<form>` wrapper:
```jsx
<form onSubmit={handleFormSubmit}>
  ...
</form>
```

---

## 2. Uncontrolled Forms & Input Validation (`ReactHookFormDemo.jsx`)
Path: `src/components/Demo/ReactHookFormDemo.jsx`

Using React controlled components triggers component re-renders on every keystroke. React Hook Form reduces boilerplate and improves rendering performance by utilizing uncontrolled inputs.

### TODO Form 5: Installation & Import
1. Install `react-hook-form` in the workspace:
```bash
bun install react-hook-form
# or
npm install react-hook-form
```
2. Locate `TODO Form 5` at the top of `ReactHookFormDemo.jsx` and import `useForm`:
```javascript
import { useForm } from "react-hook-form";
```

### TODO Form 6: Initializing the Hook
1. Locate `TODO Form 6` inside `ReactHookFormDemo.jsx`.
2. Un-comment the `useForm` hook initialization and remove the starter fallbacks:
```javascript
const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm({
  defaultValues: { fullName: "", email: "", age: "" }
});
```

### TODO Form 7: Binding Fields with Validation Rules
1. Locate `TODO Form 7` in the input elements of `ReactHookFormDemo.jsx`.
2. Bind the inputs using the `register` helper, configuring specific validation constraints:
```jsx
<input
  type="text"
  {...register("fullName", { 
    required: "Full name is required", 
    minLength: {
      value: 3,
      message: "Full name must be at least 3 characters long"
    }
  })}
/>

<input
  type="text"
  {...register("email", { 
    required: "Email address is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Please enter a valid email address"
    }
  })}
/>

<input
  type="number"
  {...register("age", { 
    required: "Age is required",
    min: {
      value: 18,
      message: "You must be at least 18 years old"
    },
    max: {
      value: 120,
      message: "Please enter a valid age"
    }
  })}
/>
```

### TODO Form 8: Form Submission Workflow
The `handleSubmit` function performs a validation sweep across all registered inputs. It only triggers the custom `onSubmit` callback if all validation rules are met.

1. Locate `TODO Form 8` in the form tag of `ReactHookFormDemo.jsx`.
2. Wrap the custom submission inside `handleSubmit`:
```jsx
<form onSubmit={handleSubmit(onSubmit)}>
  ...
</form>
```

### TODO Form 9: Conditional Validation Feedback
Error messages are stored in the `errors` object and can be conditionally checked to render inline validation alerts.

1. Locate `TODO Form 9` inside the form layout of `ReactHookFormDemo.jsx`.
2. Ensure validation messages are displayed:
```jsx
{errors.fullName && (
  <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "4px" }}>
    ⚠ {errors.fullName.message}
  </p>
)}
```

---

## Guidelines Summary
* Call `e.preventDefault()` inside standard submit handlers to keep application state in-memory.
* Consolidate complex forms into a single state object to maintain a clean codebase.
* Prefer `react-hook-form` to handle compound validations and optimize React rendering loops.
