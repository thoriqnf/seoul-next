// TODO TS 1: Define a Todo interface
export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
}

// TODO TS 2: Define a union type for filtering
export type TodoFilter = 'all' | 'completed' | 'pending';

// Helper interface for DummyJSON API Response structure
export interface DummyJsonTodoResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}
