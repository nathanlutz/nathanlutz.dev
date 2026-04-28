"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isFeatureEnabled } from "@/lib/features";

export default function Navigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/graphs", label: "Graphs & Data" },
    { href: "/contact", label: "Contact" },
  ];

  if (isFeatureEnabled("researchNotes")) {
    links.splice(1, 0, { href: "/research", label: "Research Notes" });
  }

  function isActive(link: { href: string }) {
    return (
      pathname === link.href ||
      (link.href === "/research" && pathname?.startsWith("/research")) ||
      (link.href === "/graphs" && pathname?.startsWith("/graphs"))
    );
  }

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Close on Escape, lock body scroll while open
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-5 sm:px-6 md:px-10 md:py-[26px]">
          <Link
            href="/"
            className="pr-4 text-base font-extrabold uppercase tracking-[0.05em] transition-colors hover:text-blue-500 sm:text-lg"
          >
            Nathan Lutz
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex gap-[9px]">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 pt-2 pb-3 rounded-lg meta text-center transition-all duration-300 ease-in-out ${
                    isActive(link)
                      ? "bg-[#231f20] text-white [text-shadow:_0_0_0.5px_currentColor]"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] group"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-6 h-[2px] bg-foreground transition-all duration-300 origin-center ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-foreground transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[2px] bg-foreground transition-all duration-300 origin-center ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-background flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-3xl font-extrabold uppercase tracking-[0.05em] transition-colors duration-200 ${
                  isActive(link)
                    ? "text-foreground"
                    : "text-zinc-400 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
