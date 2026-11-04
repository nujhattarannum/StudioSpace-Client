"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const UserDropdown = ({ user }: IUserDropdownProps) => {
  const router = useRouter();

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
    <DropdownMenu>
      {/* PROFILE BUTTON */}
      <DropdownMenuTrigger >
        <button className="flex items-center gap-2 rounded-full border border-[#E5D3C0] bg-[#FFFCF7] p-1.5 pr-3 transition hover:bg-[#F3E7D8] focus:outline-none dark:border-[#514034] dark:bg-[#30251F] dark:hover:bg-[#4A362A]">
          {/* PROFILE IMAGE OR INITIAL */}
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F3E7D8] font-bold text-[#4A291B] dark:bg-[#4A362A] dark:text-[#F3E7D8]">
              {firstLetter}
            </div>
          )}

          <span className="hidden text-sm font-bold text-[#4A291B] dark:text-[#F3E7D8] sm:block">
            {user.name}
          </span>

          <ChevronDown
            size={15}
            className="text-[#78675B] dark:text-[#C6B4A4]"
          />
        </button>
      </DropdownMenuTrigger>

      {/* DROPDOWN CONTENT */}
      <DropdownMenuContent
        align="end"
        className="w-64 rounded-xl border-[#E5D3C0] bg-[#FFFCF7] p-2 text-[#4A291B] dark:border-[#514034] dark:bg-[#30251F] dark:text-[#F3E7D8]"
      >
        {/* USER INFORMATION */}
        <DropdownMenuLabel className="px-3 py-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold text-[#4A291B] dark:text-[#F3E7D8]">
              {user.name}
            </span>

            <span className="text-xs font-normal text-[#78675B] dark:text-[#C6B4A4]">
              {user.email}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-[#E5D3C0] dark:bg-[#514034]" />

        {/* DASHBOARD */}
        <DropdownMenuItem >
          <Link
            href="/dashboard"
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#4A291B] hover:bg-[#F3E7D8] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
          >
            <LayoutDashboard size={17} />
            Dashboard
          </Link>
        </DropdownMenuItem>

        {/* ADD NEW STUDIO */}
        <DropdownMenuItem >
          <Link
            href="/add-studio"
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#4A291B] hover:bg-[#F3E7D8] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
          >
            <PlusCircle size={17} />
            Add New Studio
          </Link>
        </DropdownMenuItem>

        {/* MY LISTINGS */}
        <DropdownMenuItem >
          <Link
            href="/my-listings"
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#4A291B] hover:bg-[#F3E7D8] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
          >
            <Building2 size={17} />
            My Studio Listings
          </Link>
        </DropdownMenuItem>

        {/* MY BOOKINGS */}
        <DropdownMenuItem >
          <Link
            href="/my-bookings"
            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#4A291B] hover:bg-[#F3E7D8] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
          >
            <CalendarDays size={17} />
            My Bookings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-[#E5D3C0] dark:bg-[#514034]" />

        {/* LOGOUT */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer gap-3 rounded-lg px-3 py-2 text-sm font-semibold text-red-700 focus:bg-red-50 focus:text-red-700 dark:text-red-400 dark:focus:bg-red-950 dark:focus:text-red-300"
        >
          <LogOut size={17} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;