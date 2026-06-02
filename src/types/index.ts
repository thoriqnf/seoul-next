// ============================================================================
// TODO TS 1: Define a union type for filtering ('all' | 'completed' | 'pending')
// ============================================================================
export type TodoFilter = 'all' | 'completed' | 'pending';

// ============================================================================
// TODO TS 2: Define a Todo interface (id, todo, completed, userId)
// ============================================================================
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

// ============================================================================
// TODO TS 3: Define the DummyJSON API response structure
// ============================================================================
export interface DummyJsonTodoResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

// ==========================================
// TODO ROUTING 1: Define TypeScript interface for TodoItem Props
// (Define properties: todo of type Todo, onToggle callback, and onDelete callback)
// ==========================================
// export interface TodoItemProps {
//   todo: Todo;
//   onToggle: (id: number) => void;
//   onDelete: (id: number) => void;
// }
