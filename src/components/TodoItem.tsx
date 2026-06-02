"use client";

import { Todo } from "@/types";

// ==========================================
// TODO ROUTING 1: Import TodoItemProps from "@/types" and use it to replace the inline type signature below.
// (Remember to uncomment/define TodoItemProps inside src/types/index.ts first!)
// ==========================================
export function TodoItem({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <li className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-100 dark:border-neutral-800/80 hover:border-slate-200 dark:hover:border-neutral-700 bg-white dark:bg-zinc-900 transition-all duration-150">
      <div className="flex items-center gap-4 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
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
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-slate-50 dark:hover:bg-zinc-950 cursor-pointer transition-all duration-200"
        title="Delete Task"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </li>
  );
}
