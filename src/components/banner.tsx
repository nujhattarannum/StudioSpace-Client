import Link from "next/link";
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Mic,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Banner() {
  return (
    <section className="bg-[#FBF6EE] px-4 pb-8 pt-5 sm:px-6 lg:px-8">
      <div
        className="relative mx-auto flex min-h-[420px] max-w-7xl items-center overflow-hidden rounded-[28px] border border-[#E5D3C0] bg-cover bg-center sm:min-h-[480px] lg:min-h-[520px]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(251,246,238,0.97) 0%, rgba(251,246,238,0.90) 36%, rgba(251,246,238,0.12) 75%), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=2000&q=85')",
        }}
      >
        {/* Left content */}
        <div className="relative z-10 max-w-2xl px-6 py-12 sm:px-10 lg:px-16">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E5D3C0] bg-[#FBF6EE]/90 px-4 py-2 text-sm font-bold text-[#4A291B]">
            <Sparkles size={17} />
            Your creative space awaits
          </div>

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

          <p className="mt-6 max-w-xl text-base leading-7 text-[#655348] sm:text-lg">
            Discover soundproof music suites, cinema sound
            stages, photo cyc walls, and podcast lounges
            near you.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/studios">
              <Button className="h-12 w-full rounded-xl bg-[#4A291B] px-6 text-base font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#2C221E] sm:w-auto">
                Explore Studios
                <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>

            <Link href="/add-studio">
              <Button
                variant="outline"
                className="h-12 w-full rounded-xl border-2 border-[#4A291B] bg-[#FBF6EE]/80 px-6 text-base font-bold text-[#4A291B] hover:bg-[#F3E7D8] sm:w-auto"
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

        {/* Carousel controls: visual mockup */}
        <button
          type="button"
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5D3C0] bg-[#FBF6EE]/90 text-[#4A291B] transition hover:bg-white lg:flex"
        >
          <ChevronLeft size={23} />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#E5D3C0] bg-[#FBF6EE]/90 text-[#4A291B] transition hover:bg-white lg:flex"
        >
          <ChevronRight size={23} />
        </button>

        {/* Slide indicators: visual mockup */}
        <div className="absolute bottom-5 right-8 z-20 flex gap-2">
          <span className="h-2.5 w-7 rounded-full bg-[#4A291B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4A291B]/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4A291B]/40" />
        </div>
      </div>
    </section>
  );
}