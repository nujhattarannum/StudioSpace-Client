"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ArrowRight,
  Camera,
  Mail,
} from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/#about" },
];

const supportLinks = [
  { name: "Help Center", href: "/help" },
  { name: "Safety", href: "/safety" },
  { name: "Contact Us", href: "/contact" },
  { name: "FAQs", href: "/faq" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Connect your newsletter API here.
    console.log("Newsletter email:", email);

    setEmail("");
  }

  return (
    <footer className="bg-[#2C221E] text-[#FBF6EE] dark:bg-[#17120F] dark:text-[#F3E7D8]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Branding */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F3E7D8] text-[#4A291B] dark:bg-[#4A362A] dark:text-[#F3E7D8]">
                <Camera size={26} />
              </div>

              <span className="brand-font text-2xl font-bold sm:text-3xl">
                StudioSpace
              </span>
            </Link>

            <p className="mt-5 max-w-xs leading-7 text-[#D8C7B6] dark:text-[#C6B4A4]">
              Create. Collaborate. Belong.
              <br />
              A creative workspace marketplace
              for creators, by creators.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="rounded-full border border-[#8C7665] p-2 transition hover:bg-[#4A291B] dark:border-[#665247] dark:hover:bg-[#4A362A]"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="https://youtube.com"
                aria-label="YouTube"
                className="rounded-full border border-[#8C7665] p-2 transition hover:bg-[#4A291B] dark:border-[#665247] dark:hover:bg-[#4A362A]"
              >
                <FaYoutube size={18} />
              </a>

              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="rounded-full border border-[#8C7665] p-2 transition hover:bg-[#4A291B] dark:border-[#665247] dark:hover:bg-[#4A362A]"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="brand-font text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#D8C7B6] transition hover:text-white dark:text-[#C6B4A4] dark:hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="brand-font text-xl font-semibold">
              Support
            </h3>

            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#D8C7B6] transition hover:text-white dark:text-[#C6B4A4] dark:hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="brand-font text-xl font-semibold">
              Stay Updated
            </h3>

            <p className="mt-4 leading-6 text-[#D8C7B6] dark:text-[#C6B4A4]">
              Discover inspiring spaces, new studios,
              and creative opportunities.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="mt-5 space-y-3"
            >
              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#78675B] dark:text-[#C6B4A4]"
                />

                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  aria-label="Your email address"
                  className="h-12 rounded-xl border-[#8C7665] bg-[#FBF6EE] pl-10 text-[#2C221E] placeholder:text-[#8C7665] dark:border-[#665247] dark:bg-[#30251F] dark:text-[#F3E7D8] dark:placeholder:text-[#BDAA99]"
                />
              </div>

              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-[#F3E7D8] font-bold text-[#4A291B] hover:bg-[#E5D3C0] dark:bg-[#4A362A] dark:text-[#F3E7D8] dark:hover:bg-[#665247]"
              >
                Subscribe
                <ArrowRight size={17} className="ml-2" />
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#665247] pt-6 text-sm text-[#D8C7B6] sm:flex-row sm:items-center sm:justify-between dark:border-[#514034] dark:text-[#C6B4A4]">
          <p>
            © {new Date().getFullYear()} StudioSpace.
            All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="hover:text-white dark:hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="hover:text-white dark:hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}