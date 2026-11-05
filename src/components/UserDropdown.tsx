"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarDays,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

interface IUserDropdownProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

export default function UserDropdown({ user }: IUserDropdownProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully!");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Could not log out. Please try again.");
    }
  };

  const firstLetter = user.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full border border-[#E5D3C0] bg-[#FFFCF7] p-1.5 pr-3 transition hover:bg-[#F3E7D8] focus:outline-none dark:border-[#514034] dark:bg-[#30251F] dark:hover:bg-[#4A362A]"
      >
        {user.image ? (
          <img src={user.image} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3E7D8] font-bold text-[#4A291B] dark:bg-[#4A362A] dark:text-[#F3E7D8]">
            {firstLetter}
          </div>
        )}
        <span className="hidden text-sm font-bold text-[#4A291B] dark:text-[#F3E7D8] sm:block">
          {user.name}
        </span>
        <ChevronDown size={15} className={`text-[#78675B] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu Content */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-2 shadow-lg text-[#4A291B] dark:border-[#514034] dark:bg-[#30251F] dark:text-[#F3E7D8] z-50">
          
          {/* User Info Header */}
          <div className="px-3 py-3 border-b border-[#E5D3C0] dark:border-[#514034]">
            <p className="text-sm font-bold text-[#4A291B] dark:text-[#F3E7D8]">{user.name}</p>
            <p className="text-xs text-[#78675B] dark:text-[#C6B4A4] truncate">{user.email}</p>
          </div>

          {/* Links */}
          <div className="py-2 space-y-1">
            <Link
              href = "/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium hover:bg-[#F3E7D8] dark:hover:bg-[#4A362A]"
            >
              <LayoutDashboard size={17} /> Dashboard
            </Link>
            <Link
              href="/add-studio"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium hover:bg-[#F3E7D8] dark:hover:bg-[#4A362A]"
            >
              <PlusCircle size={17} /> Add New Studio
            </Link>
            <Link
              href="/my-listings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium hover:bg-[#F3E7D8] dark:hover:bg-[#4A362A]"
            >
              <Building2 size={17} /> My Studio Listings
            </Link>
            <Link
              href="/my-booking"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium hover:bg-[#F3E7D8] dark:hover:bg-[#4A362A]"
            >
              <CalendarDays size={17} /> My Bookings
            </Link>
          </div>

          <div className="my-1 border-t border-[#E5D3C0] dark:border-[#514034]" />

          {/* Logout Button */}
          <button
            onClick={() => {
              setIsOpen(false);
              handleLogout();
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
          >
            <LogOut size={17} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}