import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Mic,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Banner() {
  return (
    <section className="bg-[#FBF6EE] px-4 pb-8 pt-5 dark:bg-[#211A16] sm:px-6 lg:px-8">
      <div
        className="relative mx-auto flex min-h-[420px] max-w-7xl items-center overflow-hidden rounded-[28px] border border-[#E5D3C0] bg-cover bg-center dark:border-[#514034] sm:min-h-[480px] lg:min-h-[520px]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(251,246,238,0.97) 0%, rgba(251,246,238,0.90) 36%, rgba(251,246,238,0.12) 75%), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85')",
        }}
      >
        {/* Left content */}
        <div className="relative z-10 max-w-2xl px-6 py-12 sm:px-10 lg:px-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E5D3C0] bg-[#FBF6EE]/90 px-4 py-2 text-sm font-bold text-[#4A291B] dark:border-[#514034] dark:bg-[#30251F]/90 dark:text-[#F3E7D8]">
            <Sparkles size={17} />
            Your creative space awaits
          </div>

          {/* Fixed heading color so it stays dark and high-contrast against the light banner overlay */}
          <h1 className="brand-font text-4xl font-bold leading-[1.08] tracking-tight text-[#4A291B] sm:text-5xl lg:text-7xl">
            Rent Premier
            <br />
            Creative Studios
            <br />
            <span className="relative inline-block">
              by the Hour
              <span className="absolute -bottom-1 left-0 h-2 w-full -rotate-1 rounded-full bg-[#E5D3C0]" />
            </span>
          </h1>

          {/* Fixed description text color */}
          <p className="mt-6 max-w-xl text-base font-medium leading-7 text-[#554338] sm:text-lg">
            Discover soundproof music suites, cinema sound
            stages, photo cyc walls, and podcast lounges
            near you.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/studios">
              <Button className="h-12 w-full rounded-xl bg-[#4A291B] px-6 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#C6B4A4] sm:w-auto">
                Explore Studios
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>

            <Link href="/add-studio">
              <Button
                variant="outline"
                className="h-12 w-full rounded-xl border-2 border-[#4A291B] bg-[#FBF6EE]/80 px-6 text-base font-bold text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#C6B4A4] dark:bg-[#30251F]/80 dark:text-[#F3E7D8] dark:hover:bg-[#4A362A] sm:w-auto"
              >
                Host Your Space
                <Mic className="ml-2" size={18} />
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm font-semibold text-[#655348]">
            <span className="flex items-center gap-2">
              <Camera size={17} />
              Photo studios
            </span>

            <span className="flex items-center gap-2">
              <Mic size={17} />
              Podcast rooms
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}