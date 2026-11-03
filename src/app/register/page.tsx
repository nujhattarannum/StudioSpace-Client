"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Camera, Lock, Mail, User, Image as ImageIcon, Loader2, CheckCircle2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSocialLoading, setIsSocialLoading] = useState<string | null>(null);

  // Password validation checks
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const isValidLength = password.length >= 6;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password criteria
    if (!hasUppercase || !hasLowercase || !isValidLength) {
      setPasswordError("Please meet all password requirements.");
      toast.error("Password does not meet validation criteria.");
      return;
    }

    setPasswordError("");
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        image: photoURL,
      }, {
        onSuccess: () => {
          toast.success("Account created successfully!");
          router.push("/login");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Registration failed. Try again.");
        },
      });

      if (error) {
        toast.error(error.message || "Failed to register.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
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
    <main className="flex min-h-screen items-center justify-center bg-[#FBF6EE] px-4 py-12">
      <div className="w-full max-w-md space-y-8 rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] p-8 shadow-sm">
        
        {/* Header Title */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3E7D8] text-[#4A291B]">
            <Camera size={24} />
          </div>
          <h2 className="brand-font mt-4 text-3xl font-extrabold tracking-tight text-[#4A291B]">
            Create an Account
          </h2>
          <p className="mt-1 text-xs font-semibold text-[#78675B]">
            Join StudioSpace to book and list creative workspaces
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isSocialLoading !== null}
            onClick={() => handleSocialLogin("google")}
            className="h-11 rounded-xl border-[#E5D3C0] bg-[#FFFCF7] text-xs font-bold text-[#4A291B] hover:bg-[#F3E7D8]"
          >
            {isSocialLoading === "google" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <span>Google</span>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={isSocialLoading !== null}
            onClick={() => handleSocialLogin("github")}
            className="h-11 rounded-xl border-[#E5D3C0] bg-[#FFFCF7] text-xs font-bold text-[#4A291B] hover:bg-[#F3E7D8]"
          >
            {isSocialLoading === "github" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <span>GitHub</span>
            )}
          </Button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E5D3C0]" />
          </div>
          <span className="relative bg-[#FFFCF7] px-3 text-[11px] font-bold uppercase tracking-wider text-[#8A796B]">
            Or with email
          </span>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4A291B]">Full Name</label>
            <div className="relative flex items-center">
              <User size={16} className="absolute left-3 text-[#8A796B]" />
              <Input
                type="text"
                required
                placeholder="Nujhat Tasnim"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] pl-10 text-xs font-semibold text-[#4A291B] focus-visible:ring-[#4A291B]"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4A291B]">Email Address</label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3 text-[#8A796B]" />
              <Input
                type="email"
                required
                placeholder="nujhat@studiospace.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] pl-10 text-xs font-semibold text-[#4A291B] focus-visible:ring-[#4A291B]"
              />
            </div>
          </div>

          {/* Photo URL Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4A291B]">Photo URL</label>
            <div className="relative flex items-center">
              <ImageIcon size={16} className="absolute left-3 text-[#8A796B]" />
              <Input
                type="url"
                required
                placeholder="https://example.com/avatar.jpg"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="h-11 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] pl-10 text-xs font-semibold text-[#4A291B] focus-visible:ring-[#4A291B]"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#4A291B]">Password</label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3 text-[#8A796B]" />
              <Input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] pl-10 text-xs font-semibold text-[#4A291B] focus-visible:ring-[#4A291B]"
              />
            </div>
          </div>

          {/* Live Password Validation Checklist */}
          <div className="rounded-xl border border-[#E5D3C0] bg-[#F3E7D8]/40 p-3 space-y-1.5">
            <p className="text-[11px] font-bold text-[#4A291B]">Password Requirements:</p>
            <div className="grid grid-cols-1 gap-1 text-[11px]">
              <div className={`flex items-center gap-1.5 ${isValidLength ? "text-green-700 font-semibold" : "text-[#78675B]"}`}>
                {isValidLength ? <CheckCircle2 size={13} /> : <XCircle size={13} />} At least 6 characters long
              </div>
              <div className={`flex items-center gap-1.5 ${hasUppercase ? "text-green-700 font-semibold" : "text-[#78675B]"}`}>
                {hasUppercase ? <CheckCircle2 size={13} /> : <XCircle size={13} />} Must include an Uppercase letter
              </div>
              <div className={`flex items-center gap-1.5 ${hasLowercase ? "text-green-700 font-semibold" : "text-[#78675B]"}`}>
                {hasLowercase ? <CheckCircle2 size={13} /> : <XCircle size={13} />} Must include a Lowercase letter
              </div>
            </div>
            {passwordError && (
              <p className="pt-1 text-[11px] font-bold text-red-600">{passwordError}</p>
            )}
          </div>

          {/* Register Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="mt-2 h-12 w-full rounded-xl bg-[#4A291B] font-bold text-white hover:bg-[#2C221E]"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="mr-2 animate-spin" /> Creating Account...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>

        {/* Footer Login Link */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#78675B]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#4A291B] hover:underline">
              Login here
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}