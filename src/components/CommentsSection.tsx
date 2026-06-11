import { NewsComment } from "@/types";

async function getComments(postId: string): Promise<NewsComment[]> {
  try {
    // Add artificial delay of 1.5s to clearly demonstrate Streaming HTML with Suspense
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const response = await fetch(`https://dummyjson.com/comments/post/${postId}`, {
      next: { revalidate: 10 }
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.comments || [];
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return [];
  }
}

export async function CommentsSection({ postId }: { postId: string }) {
  const comments = await getComments(postId);

  return (
    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-neutral-800">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-4 bg-teal-500 rounded"></span>
        <h3 className="text-sm font-bold text-slate-800 dark:text-zinc-200">
          Comments ({comments.length})
        </h3>
      </div>

      {comments.length === 0 ? (
        <p className="text-xs text-slate-400 dark:text-zinc-500 text-center py-6 bg-slate-50 dark:bg-zinc-900/40 rounded-xl border border-dashed border-slate-200/50 dark:border-neutral-800/80">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/30 border border-slate-100 dark:border-neutral-800/60"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-zinc-300">
                  @{comment.user.username}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-zinc-500">
                  Just now
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                {comment.body}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
