export default function DashboardStats() {
  const cards = [
    {
      title: "Companies",
      value: "124",
      color: "text-blue-400",
    },
    {
      title: "Portfolio Score",
      value: "87",
      color: "text-green-400",
    },
    {
      title: "AI Recommendation",
      value: "BUY",
      color: "text-emerald-400",
    },
    {
      title: "Watchlist",
      value: "18",
      color: "text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl bg-slate-900 border border-slate-800 p-6"
        >
          <p className="text-slate-400">
            {card.title}
          </p>

          <h2 className={`mt-3 text-4xl font-bold ${card.color}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}