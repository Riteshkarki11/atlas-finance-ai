interface ListCardProps {
  title: string;
  items: string[];
  icon: string;
}

export default function ListCard({
  title,
  items,
  icon,
}: ListCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <h3 className="mb-6 text-2xl font-bold text-white">
        {title}
      </h3>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-lg bg-slate-800 p-3 text-slate-200"
          >
            <span>{icon}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}