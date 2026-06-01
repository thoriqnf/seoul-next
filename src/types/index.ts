// ============================================================================
// ⚠️ EDUCATIONAL NOTE ON THE 'any' TYPE:
// The 'any' type is an escape hatch that tells the TypeScript compiler to skip
// checking a variable. Using 'any' in real applications is STRONGLY DISCOURAGED
// because it turns off type safety, bringing you back to unsafe JavaScript.
// We use 'any' here ONLY as a temporary compilable placeholder so the starter
// code builds cleanly on checkout. Replace them all with strict, explicit types!
// ============================================================================

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
