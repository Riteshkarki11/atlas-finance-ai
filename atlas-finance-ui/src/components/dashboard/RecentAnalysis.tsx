export default function RecentAnalysis() {
  const companies = [
    "AAPL",
    "MSFT",
    "NVDA",
    "NFLX",
    "TSLA",
  ];

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-6">
      <h2 className="text-xl font-semibold text-white mb-5">
        Recent Analysis
      </h2>

      <div className="space-y-3">
        {companies.map((company) => (
          <div
            key={company}
            className="flex justify-between border-b border-slate-800 pb-3"
          >
            <span>{company}</span>

            <span className="text-green-400">
              BUY
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}