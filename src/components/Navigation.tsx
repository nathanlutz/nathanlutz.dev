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
      <div className="max-w-4xl mx-auto px-10 py-[26px] flex items-center justify-between">
        <Link
          href="/"
          className="font-extrabold text-lg uppercase tracking-[0.05em] hover:text-blue-500 transition-colors"
        >
          Nathan Lutz
        </Link>
        <ul className="flex gap-[9px]">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`px-3 pt-2 pb-3 rounded-lg meta text-center transition-all duration-300 ease-in-out ${
                  pathname === link.href || (link.href === "/research" && pathname?.startsWith("/research"))
                    ? "bg-[#231f20] text-white [text-shadow:_0_0_0.5px_currentColor]"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
