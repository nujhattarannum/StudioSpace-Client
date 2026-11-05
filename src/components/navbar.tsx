"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import UserDropdown from "@/components/UserDropdown";
import { authClient } from "@/lib/auth-client";

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
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5D3C0] bg-[#FBF6EE]/95 backdrop-blur-md dark:border-[#514034] dark:bg-[#211A16]/95">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[#4A291B] dark:text-[#F3E7D8]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E7D8] dark:bg-[#4A362A]">
            <Camera
              size={25}
              strokeWidth={2.3}
              className="text-[#4A291B] dark:text-[#F3E7D8]"
            />
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
                    ? "text-[#4A291B] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-[#4A291B] dark:text-[#F3E7D8] dark:after:bg-[#F3E7D8]"
                    : "text-[#78675B] hover:text-[#4A291B] dark:text-[#BDAA99] dark:hover:text-[#F3E7D8]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="rounded-full text-[#4A291B] hover:bg-[#F3E7D8] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
          >
            {theme === "dark" ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </Button>

          {/* Authentication */}
          {isPending ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-[#F3E7D8] dark:bg-[#4A362A]" />
          ) : session?.user ? (
            <UserDropdown
              user={{
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
              }}
            />
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-full border-[#4A291B] text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#BDAA99] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
                >
                  Log in
                </Button>
              </Link>

              <Link href="/register">
                <Button className="rounded-full bg-[#4A291B] text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#E5D3C0]">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-[#4A291B] hover:bg-[#F3E7D8] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A] md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </Button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-[#E5D3C0] bg-[#FBF6EE] px-5 py-5 dark:border-[#514034] dark:bg-[#211A16] md:hidden">
          <div className="flex flex-col gap-4">

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
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-2 font-semibold transition ${
                    active
                      ? "bg-[#F3E7D8] text-[#4A291B] dark:bg-[#4A362A] dark:text-[#F3E7D8]"
                      : "text-[#4A291B] hover:bg-[#F3E7D8] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile theme toggle */}
            <Button
              variant="outline"
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="w-full justify-start gap-2 rounded-xl border-[#E5D3C0] text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#514034] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={18} />
                  Switch to Light Mode
                </>
              ) : (
                <>
                  <Moon size={18} />
                  Switch to Dark Mode
                </>
              )}
            </Button>

            {/* Mobile authentication */}
            {isPending ? (
              <div className="h-10 w-full animate-pulse rounded-xl bg-[#F3E7D8] dark:bg-[#4A362A]" />
            ) : session?.user ? (
              <UserDropdown
                user={{
                  name: session.user.name,
                  email: session.user.email,
                  image: session.user.image,
                }}
              />
            ) : (
              <div className="mt-2 flex gap-3">
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1"
                >
                  <Button
                    variant="outline"
                    className="w-full rounded-xl border-[#4A291B] text-[#4A291B] dark:border-[#BDAA99] dark:text-[#F3E7D8]"
                  >
                    Log in
                  </Button>
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1"
                >
                  <Button className="w-full rounded-xl bg-[#4A291B] text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#E5D3C0]">
                    Register
                  </Button>
                </Link>
              </div>
            )}

          </div>
        </div>
      )}
    </header>
  );
}