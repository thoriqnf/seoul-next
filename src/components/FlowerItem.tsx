import { FlowerItemProps } from "@/types";

export function FlowerItem({ flower, onEdit, onDelete, disabled }: FlowerItemProps) {
  const categorySlug = flower.category ? flower.category.toLowerCase() : "default";
  const badgeClass = `shop-badge badge-${categorySlug}`;

  return (
    <tr>
      <td className="admin-td">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-zinc-800 flex-shrink-0">
            {flower.image ? (
              <img src={flower.image} alt={flower.name} className="h-full w-full object-cover" />
            ) : (
              <div className="text-xl flex h-full w-full items-center justify-center">🌸</div>
            )}
          </div>
          <span className="font-bold text-slate-800 dark:text-zinc-100 line-clamp-1">{flower.name}</span>
        </div>
      </td>
      <td className="admin-td">
        <span className={badgeClass}>{flower.category || "General"}</span>
      </td>
      <td className="admin-td font-semibold text-slate-900 dark:text-zinc-50">
        ${Number(flower.price).toFixed(2)}
      </td>
      <td className="admin-td">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(flower)}
            disabled={disabled}
            className="btn-edit"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(flower.id)}
            disabled={disabled}
            className="btn-danger"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
