// ============================================================================
// TODO TS 1: Define a union type for filtering ('all' | 'completed' | 'pending')
// Currently this is typed as 'any'. Change it to the literal union type!
// ============================================================================
export type TodoFilter = any; 

// ============================================================================
// TODO TS 2: Define a Todo interface (id: number, todo: string, completed: boolean, userId: number)
// Currently this is empty. Define the structure with proper primitive types!
// ============================================================================
export interface Todo {
  id: any;
  todo: any;
  completed: any;
  userId: any;
}

// ============================================================================
// TODO TS 3: Define the DummyJSON API response structure (todos: Todo[], total: number, skip: number, limit: number)
// Currently this is empty. Define the structure matching paginated DummyJSON response!
// ============================================================================
export interface DummyJsonTodoResponse {
  todos: any[];
  total: any;
  skip: any;
  limit: any;
}
