"use client";

import { useState, useEffect } from "react";
import { Todo, TodoFilter, DummyJsonTodoResponse } from "@/types";

export default function Home() {
  // ==========================================
  // TODO TS 4: Define typed useState hooks for primitive & union states
  // ==========================================
  const [newTodoText, setNewTodoText] = useState<string>("");
  const [filter, setFilter] = useState<TodoFilter>("all");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ==========================================
  // TODO TS 5: Define typed useState hook for the array of Todos
  // ==========================================
  const [todos, setTodos] = useState<Todo[]>([]);

  // ==========================================
  // Typed useEffect for initial API data loading
  // ==========================================
  useEffect(() => {
    const abortController = new AbortController();

    const fetchTodos = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("https://dummyjson.com/todos?limit=8", {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Error: Failed to fetch todos (${response.statusText})`);
        }

        // ==========================================
        // TODO TS 7: Parse response & cast it to DummyJsonTodoResponse
        // ==========================================
        const data: DummyJsonTodoResponse = await response.json();
        setTodos(data.todos);
      } catch (err) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();

    // ==========================================
    // TODO TS 8: Return cleanup function to cancel fetch on unmount
    // ==========================================
    return () => {
      abortController.abort();
    };
  }, []);

  // ==========================================
  // TODO TS 6: Type event handlers for form submission and change events
  // ==========================================
  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    // Create a new typed Todo item
    const newTodoItem: Todo = {
      id: Date.now(), // Generate local unique numeric ID
      todo: newTodoText.trim(),
      completed: false,
      userId: 1,
    };

    setTodos((prevTodos) => [newTodoItem, ...prevTodos]);
    setNewTodoText("");
  };

  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Derive filtered list
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  // Calculate statistics
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 md:py-20 font-sans">
      {/* Header Panel */}
      <header className="mb-10 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-full">
          Week 2 • Day 1
        </span>
        <h1 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-50">
          Next.js with TypeScript Demo
        </h1>
        <p className="mt-2 text-slate-500 dark:text-zinc-400 max-w-2xl text-base leading-relaxed">
          An interactive, beginner-friendly Todo Dashboard designed to teach TypeScript interfaces/types, typed <code className="text-sm font-mono text-pink-600 dark:text-pink-400">useState</code>, and typed <code className="text-sm font-mono text-pink-600 dark:text-pink-400">useEffect</code>.
        </p>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Stats Card & Form */}
        <div className="flex flex-col gap-6 md:col-span-1">
          {/* Form Card */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 transition-all duration-300">
            <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-4">
              Add New Task
            </h2>
            <form onSubmit={handleAddTodo} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={newTodoText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTodoText(e.target.value)}
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-neutral-800 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
              <button
                type="submit"
                disabled={!newTodoText.trim()}
                className="w-full py-2.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 dark:disabled:bg-zinc-800 disabled:text-slate-400 dark:disabled:text-zinc-600 hover:shadow-indigo-500/10 cursor-pointer disabled:cursor-not-allowed transition-all duration-200"
              >
                Add Task
              </button>
            </form>
          </div>

          {/* Stats Card */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-4">
              Progress Tracker
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-2">
                <span className="text-sm text-slate-500 dark:text-zinc-400">Total Tasks</span>
                <span className="text-sm font-bold text-slate-900 dark:text-zinc-50">{totalCount}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-neutral-800 pb-2">
                <span className="text-sm text-slate-500 dark:text-zinc-400">Completed</span>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">{completedCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500 dark:text-zinc-400">Pending</span>
                <span className="text-sm font-bold text-amber-600 dark:text-amber-400">{pendingCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Filters & Todos List */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Filters Bar */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-zinc-950 p-1 rounded-xl border border-slate-100 dark:border-neutral-800">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                  filter === "all"
                    ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/40 dark:border-neutral-800"
                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                  filter === "completed"
                    ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/40 dark:border-neutral-800"
                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-100"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 ${
                  filter === "pending"
                    ? "bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 shadow-sm border border-slate-200/40 dark:border-neutral-800"
                    : "text-slate-500 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-zinc-100"
                }`}
              >
                Pending
              </button>
            </div>
            <button
              onClick={() => {
                setTodos([]);
                setLoading(true);
                fetch("https://dummyjson.com/todos?limit=8")
                  .then(res => res.json())
                  .then(data => {
                    setTodos(data.todos);
                    setLoading(false);
                  })
                  .catch(err => {
                    setError("Failed to reload todos");
                    setLoading(false);
                  });
              }}
              className="px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-neutral-800 text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-950 cursor-pointer transition-all"
            >
              Reset List
            </button>
          </div>

          {/* List Card */}
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-neutral-800 rounded-2xl p-6 min-h-[350px] flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 dark:text-zinc-100 mb-6">
              Tasks
            </h2>

            {/* Error View */}
            {error && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-red-500">
                <svg className="w-12 h-12 mb-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="font-bold text-slate-800 dark:text-zinc-200">Failed to Load</h3>
                <p className="text-sm mt-1 text-slate-500 dark:text-zinc-400">{error}</p>
              </div>
            )}

            {/* Loading Skeleton */}
            {loading && (
              <div className="flex-1 flex flex-col gap-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 animate-pulse">
                    <div className="w-5 h-5 bg-slate-200 dark:bg-zinc-800 rounded-md" />
                    <div className="flex-1 h-5 bg-slate-100 dark:bg-zinc-800/65 rounded-lg" />
                    <div className="w-6 h-6 bg-slate-100 dark:bg-zinc-800 rounded-md" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty View */}
            {!loading && !error && filteredTodos.length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <svg className="w-14 h-14 mb-3 text-slate-300 dark:text-zinc-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <h3 className="font-bold text-slate-800 dark:text-zinc-200">No Tasks Found</h3>
                <p className="text-sm mt-1 text-slate-400 dark:text-zinc-500">
                  {filter === "all"
                    ? "Add a task to get started."
                    : `No ${filter} tasks matched your filter.`}
                </p>
              </div>
            )}

            {/* Tasks List */}
            {!loading && !error && filteredTodos.length > 0 && (
              <ul className="flex flex-col gap-3">
                {filteredTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-neutral-800/80 hover:border-slate-200 dark:hover:border-neutral-700 bg-white dark:bg-zinc-900 transition-all duration-150"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleTodo(todo.id)}
                        className="w-5 h-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500/20 cursor-pointer transition-all"
                      />
                      <span
                        className={`text-sm select-none transition-all duration-200 ${
                          todo.completed
                            ? "line-through text-slate-400 dark:text-zinc-600"
                            : "text-slate-700 dark:text-zinc-200"
                        }`}
                      >
                        {todo.todo}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-zinc-950 cursor-pointer transition-all duration-200"
                      title="Delete Task"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
