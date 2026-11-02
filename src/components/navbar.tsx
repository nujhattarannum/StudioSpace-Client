"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Camera,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/all-studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5D3C0] bg-[#FBF6EE]/95 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[#4A291B]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E7D8]">
            <Camera size={25} strokeWidth={2.3} />
          </div>

          <span className="brand-font text-2xl font-bold tracking-tight sm:text-3xl">
            StudioSpace
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : link.href === "/studios"
                  ? pathname.startsWith("/studios")
                  : false;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 font-semibold transition-colors ${
                  active
                    ? "text-[#4A291B] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-[#4A291B]"
                    : "text-[#78675B] hover:text-[#4A291B]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full text-[#4A291B] hover:bg-[#F3E7D8]"
          >
            {darkMode ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </Button>

          <Link href="/login">
            <Button
              variant="outline"
              className="rounded-xl border-[#4A291B] bg-transparent px-5 font-bold text-[#4A291B] hover:bg-[#F3E7D8]"
            >
              Log in
            </Button>
          </Link>

          <Link href="/register">
            <Button className="rounded-xl bg-[#4A291B] px-5 font-bold text-[#FBF6EE] hover:bg-[#2C221E]">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-[#4A291B] md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </Button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-[#E5D3C0] bg-[#FBF6EE] px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-2 font-semibold text-[#4A291B] transition hover:bg-[#F3E7D8]"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-2 flex gap-3">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1"
              >
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-[#4A291B] text-[#4A291B]"
                >
                  Log in
                </Button>
              </Link>

              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="flex-1"
              >
                <Button className="w-full rounded-xl bg-[#4A291B] text-white hover:bg-[#2C221E]">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}