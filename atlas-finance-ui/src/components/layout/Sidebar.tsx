import Link from "next/link";

const menuItems = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Company",
    href: "/company",
  },
  {
    name: "Compare",
    href: "/compare",
  },
  {
    name: "Portfolio",
    href: "/portfolio",
  },
  {
    name: "Screener",
    href: "/screener",
  },
  {
    name: "Settings",
    href: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900 p-6">
      <h1 className="mb-10 text-2xl font-bold text-white">
        Atlas Finance AI
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block rounded-lg px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}