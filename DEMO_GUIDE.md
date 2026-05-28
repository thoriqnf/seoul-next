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

### Click Events (`onClick`)
Handles basic user click interactions by updating a numeric state variable.
```jsx
const [clickCount, setClickCount] = useState(0);

const handleButtonClick = () => {
  setClickCount((prev) => prev + 1);
};

// JSX usage:
<button onClick={handleButtonClick}>
  Clicked {clickCount} times
</button>
```

### Controlled Inputs (`onChange`)
Listens to browser text input events to store current keyboard value into state.
```jsx
const [text, setText] = useState("");

const handleTextChange = (e) => {
  setText(e.target.value);
};

// JSX usage:
<input type="text" value={text} onChange={handleTextChange} />
```

### Centralized Form State (Multi-field `onChange`)
Instead of defining separate states for every form field, multiple inputs are combined into a single object. Field values are updated dynamically using the elements' `name` attribute.
```jsx
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

// JSX usage:
<input name="username" value={formData.username} onChange={handleFormChange} />
<input name="email" value={formData.email} onChange={handleFormChange} />
```

### Form Submission (`onSubmit`)
Overrides standard HTML form behavior. The handler calls `preventDefault()` to prevent a browser page reload.
```jsx
const handleFormSubmit = (e) => {
  e.preventDefault();
  setSubmittedData({ ...formData });
};

// JSX usage:
<form onSubmit={handleFormSubmit}>
  ...
</form>
```

---

## 2. Uncontrolled Forms & Input Validation (`ReactHookFormDemo.jsx`)
Path: `src/components/Demo/ReactHookFormDemo.jsx`

Using React controlled components triggers component re-renders on every keystroke. React Hook Form reduces boilerplate and improves rendering performance by utilizing uncontrolled inputs.

### Installation
Install `react-hook-form` in the workspace:
```bash
bun install react-hook-form
# or
npm install react-hook-form
```

### Initializing the hook
The `useForm` hook returns register methods and form state:
```javascript
import { useForm } from "react-hook-form";

const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
} = useForm({
  defaultValues: { fullName: "", email: "", age: "" }
});
```

### Binding Fields with Validation Rules
The `register` helper integrates the inputs with the form context and configures specific validation constraints.
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
```

### Form Submission Workflow
The `handleSubmit` function performs a validation sweep across all registered inputs. It only triggers the custom `onSubmit` callback if all validation rules are met.
```jsx
const onSubmit = (data) => {
  console.log("Valid Form Data:", data);
};

// JSX usage:
<form onSubmit={handleSubmit(onSubmit)}>
  ...
</form>
```

### Conditional Validation Feedback
Error messages are stored in the `errors` object and can be conditionally checked to render inline validation alerts.
```jsx
{errors.fullName && <p style={{ color: "red" }}>{errors.fullName.message}</p>}
```

---

## Guidelines Summary
* Call `e.preventDefault()` inside standard submit handlers to keep application state in-memory.
* Consolidate complex forms into a single state object to maintain a clean codebase.
* Prefer `react-hook-form` to handle compound validations and optimize React rendering loops.
