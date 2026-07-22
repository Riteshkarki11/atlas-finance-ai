export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950 px-8 py-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Dashboard
          </h2>

          <p className="mt-1 text-slate-400">
            Welcome to Atlas Finance AI
          </p>
        </div>

        <div className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-slate-300">
          AI Investment Research Platform
        </div>
      </div>
    </header>
  );
}
