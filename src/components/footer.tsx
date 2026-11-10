
"use client";

import Link from "next/link";

import {
  Camera,
} from "lucide-react";

import {
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Explore Studios", href: "/studios" },
  { name: "How It Works", href: "/#how-it-works" },
  { name: "About Us", href: "/about" },
];

const supportLinks = [
  { name: "Help Center", href: "/help" },
  { name: "Safety", href: "/safety" },
  { name: "Contact Us", href: "/contact" },
  { name: "FAQs", href: "/faq" },
];

const categoryLinks = [
  { name: "Photo Studios", href: "/studios?category=photo" },
  { name: "Sound Stages", href: "/studios?category=sound" },
  { name: "Podcast Rooms", href: "/studios?category=podcast" },
  { name: "Music Suites", href: "/studios?category=music" },
  { name: "Art Workshops", href: "/studios?category=art" },
];

export default function Footer() {
  return (
    <footer className="bg-[#2C221E] text-[#FBF6EE] dark:bg-[#17120F] dark:text-[#F3E7D8]">

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-16">

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

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

            {/* Social Links */}
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

              <a
                href="https://x.com"
                aria-label="X"
                className="rounded-full border border-[#8C7665] p-2 transition hover:bg-[#4A291B] dark:border-[#665247] dark:hover:bg-[#4A362A]"
              >
                <FaXTwitter size={18} />
              </a>

            </div>
          </div>

          {/* Quick Links */}
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

          {/* Popular Categories */}
          <div>
            <h3 className="brand-font text-xl font-semibold">
              Popular Categories
            </h3>

            <ul className="mt-5 space-y-3">
              {categoryLinks.map((link) => (
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

        </div>

        {/* Bottom Bar */}
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
