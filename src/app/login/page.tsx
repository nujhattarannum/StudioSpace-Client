"use client";

import { useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { Camera, Lock, Mail, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
   const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<string | null>(null);

  const handleLogin = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();


    const formdata = new FormData(e.target)
    const user =Object.fromEntries(formdata.entries()) as 
    {
      email : string,
      password : string,
    }

    try {
      const { data, error } = await authClient.signIn.email({
       ...user
      }, {
        onSuccess: () => {
          toast.success("Logged in successfully!");
          redirect("/"); // Navigate user to Home page after successful login
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Invalid email or password.");
        },
      });

      if (error) {
        toast.error(error.message || "Failed to login.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google") => {
    setIsSocialLoading(provider);
    try {
      await authClient.signIn.social({
        provider: provider,
        callbackURL: "/", // Navigate user to Home page after social login
      });
    } catch (err) {
      console.error(err);
      toast.error(`Failed to sign in with ${provider}`);
      setIsSocialLoading(null);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FBF6EE] px-4 py-12 dark:bg-[#211A16]">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] p-8 shadow-sm dark:border-[#514034] dark:bg-[#30251F]">

        {/* Header Title */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3E7D8] text-[#4A291B] dark:bg-[#4A362A] dark:text-[#F3E7D8]">
            <Camera size={24} />
          </div>
          <h2 className="brand-font mt-4 text-3xl font-extrabold tracking-tight text-[#4A291B] dark:text-[#F3E7D8]">
            Welcome Back
          </h2>
          <p className="mt-1 text-xs font-semibold text-[#78675B] dark:text-[#C6B4A4]">
            Log in to your StudioSpace account to continue
          </p>
        </div>

       {/* Social Login Button */}
<div className="w-full">
  <Button
    type="button"
    variant="outline"
    disabled={isSocialLoading !== null}
    onClick={() => handleSocialLogin("google")}
    className="h-11 w-full rounded-xl border-[#E5D3C0] bg-[#FFFCF7] text-xs font-bold text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#514034] dark:bg-[#30251F] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
  >
    {isSocialLoading === "google" ? (
      <Loader2 size={16} className="animate-spin" />
    ) : (
      <span>Google</span>
    )}
  </Button>
</div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5D3C0] dark:border-[#514034]" />
          </div>
          <span className="relative bg-[#FFFCF7] px-3 text-[11px] font-bold uppercase tracking-wider text-[#8A796B] dark:bg-[#30251F] dark:text-[#C6B4A4]">
            Or with email
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4A291B] dark:text-[#F3E7D8]">Email Address</label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3 text-[#8A796B] dark:text-[#C6B4A4]" />
              <Input
               type="email"
                name="email"
                required
                placeholder="nujhat@studiospace.com"
                className="h-11 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] pl-10 text-xs font-semibold text-[#4A291B] focus-visible:ring-[#4A291B] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#F3E7D8] dark:placeholder:text-[#8A796B] dark:focus-visible:ring-[#C6B4A4]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4A291B] dark:text-[#F3E7D8]">Password</label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3 text-[#8A796B] dark:text-[#C6B4A4]" />
              <Input
                 type="password"
                name="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] pl-10 text-xs font-semibold text-[#4A291B] focus-visible:ring-[#4A291B] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#F3E7D8] dark:placeholder:text-[#8A796B] dark:focus-visible:ring-[#C6B4A4]"
              />
            </div>
          </div>

          {/* Login Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-12 w-full rounded-xl bg-[#4A291B] font-bold text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#C6B4A4]"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* Footer Register Link */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#78675B] dark:text-[#C6B4A4]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-[#4A291B] hover:underline dark:text-[#F3E7D8]">
              Register here
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}