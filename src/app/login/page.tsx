"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#FBF6EE]">
      {/* Header */}
      <header className="border-b border-[#E5D3C0] bg-[#FBF6EE]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#4A291B]"
          >
            <Camera size={30} />

            <span className="brand-font text-2xl font-bold">
              StudioSpace
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#4A291B] hover:underline"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Login content */}
      <section className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-4 py-12">
        {/* Decorative background shapes */}
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#F3E7D8] blur-3xl" />

        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#E5D3C0]/60 blur-3xl" />

        <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] shadow-xl md:grid-cols-2">
          {/* Left side */}
          <div className="relative hidden min-h-[600px] flex-col justify-between overflow-hidden bg-[#4A291B] p-10 text-[#FBF6EE] md:flex">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#8A6650] via-[#4A291B] to-[#2C221E]" />

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D8C7B6]/40 bg-white/10">
                <Camera size={27} />
              </div>

              <h1 className="brand-font mt-10 text-5xl font-bold leading-tight">
                Welcome
                <br />
                back, creator!
              </h1>

              <p className="mt-5 max-w-sm leading-7 text-[#E5D3C0]">
                Your next great idea deserves the
                perfect space. Sign in and get back
                to creating.
              </p>
            </div>

            <div className="relative rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
              <p className="brand-font text-xl">
                Create. Collaborate. Belong.
              </p>

              <p className="mt-2 text-sm text-[#E5D3C0]">
                Find a space that feels like yours.
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E7D8] text-[#4A291B]">
                  <LockKeyhole size={27} />
                </div>

                <h2 className="brand-font mt-5 text-3xl font-bold text-[#4A291B] sm:text-4xl">
                  Let&apos;s get creating!
                </h2>

                <p className="mt-2 text-[#78675B]">
                  Log in to your StudioSpace account.
                </p>
              </div>

              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  // Connect your authentication API here.
                }}
              >
                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-bold text-[#4A291B]"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A796B]"
                    />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                      className="h-12 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] pl-10 text-[#2C221E] focus-visible:ring-[#4A291B]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-bold text-[#4A291B]"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A796B]"
                    />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      className="h-12 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] pl-10 pr-12 text-[#2C221E] focus-visible:ring-[#4A291B]"
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78675B] hover:text-[#4A291B]"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember and forgot password */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                  <label className="flex items-center gap-2 text-[#655348]">
                    <input
                      type="checkbox"
                      name="remember"
                      className="h-4 w-4 accent-[#4A291B]"
                    />
                    Remember me
                  </label>

                  <Link
                    href="/forgot-password"
                    className="font-bold text-[#4A291B] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login button */}
                <Button
                  type="submit"
                  className="h-12 w-full rounded-xl bg-[#4A291B] text-base font-bold text-white hover:bg-[#2C221E]"
                >
                  Log In
                </Button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-[#E5D3C0]" />

                <span className="text-sm text-[#8A796B]">
                  or continue with
                </span>

                <div className="h-px flex-1 bg-[#E5D3C0]" />
              </div>

              {/* Google button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  // Connect Google OAuth here.
                }}
                className="h-12 w-full rounded-xl border-[#E5D3C0] bg-white font-bold text-[#4A291B] hover:bg-[#F3E7D8]"
              >
                <svg
                  viewBox="0 0 48 48"
                  className="mr-2 h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11c-.5 2.5-2 4.6-4.2 6v5h6.8c4-3.7 6-8.6 6-14.7Z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 44c5.5 0 10.1-1.8 13.5-4.8l-6.8-5c-1.9 1.3-4.1 2-6.7 2-5.1 0-9.4-3.4-10.9-8H6.1v5.2C9.5 39.8 16.2 44 24 44Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M13.1 28.2a12 12 0 0 1 0-8.4v-5.2H6.1a20 20 0 0 0 0 18.8l7-5.2Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 11.8c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.8 29.5 4 24 4 16.2 4 9.5 8.2 6.1 14.6l7 5.2c1.5-4.6 5.8-8 10.9-8Z"
                  />
                </svg>

                Continue with Google
              </Button>

              <p className="mt-7 text-center text-sm text-[#78675B]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-extrabold text-[#4A291B] hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}