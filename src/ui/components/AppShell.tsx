import Link from "next/link";

const links = [
  { href: "/tree", label: "Tree" },
  { href: "/record", label: "Record" },
  { href: "/onboarding", label: "Onboarding" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-white shadow-sm sm:max-w-2xl">
      <header className="sticky top-0 z-10 border-b bg-white/95 p-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-moss">Unposted</h1>
          <nav className="flex gap-3 text-sm">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="rounded px-2 py-1 hover:bg-stone-100">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}
