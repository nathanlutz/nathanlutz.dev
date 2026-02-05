"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isFeatureEnabled } from "@/lib/features";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
  ];

  // Add Research link if feature is enabled
  if (isFeatureEnabled('researchNotes')) {
    links.splice(1, 0, { href: "/research", label: "Research Notes" });
  }

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-lg hover:text-blue-500 transition-colors"
        >
          Nathan Lutz
        </Link>
        <ul className="flex gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  pathname === link.href || (link.href === "/research" && pathname?.startsWith("/research"))
                    ? "text-blue-500 font-medium"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
