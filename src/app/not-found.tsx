import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Home,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-[#FBF6EE] px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">

        {/* DECORATIVE ICON */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-[#E5D3C0] bg-[#F3E7D8]">
          <Compass size={38} className="text-[#4A291B]" />
        </div>

        {/* ERROR NUMBER */}
        <p className="brand-font mt-8 text-8xl font-extrabold tracking-tight text-[#4A291B] sm:text-9xl">
          404
        </p>

        {/* DESCRIPTION */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#78675B]">
          The page you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>

        {/* DECORATIVE LINE */}
        <div className="mx-auto my-8 h-px w-24 bg-[#D9C1AA]" />

        {/* BUTTONS */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">

          <Link href="/">
            <Button className="w-full rounded-xl bg-[#4A291B] px-7 py-6 text-sm font-bold text-white hover:bg-[#2C221E] sm:w-auto">
              <Home size={16} className="mr-2" />
              Back to Home
              <ArrowRight size={15} className="ml-2" />
            </Button>
          </Link>

          <Link href="/studios">
            <Button
              variant="outline"
              className="w-full rounded-xl border-[#E5D3C0] bg-[#FFFCF7] px-7 py-6 text-sm font-bold text-[#4A291B] hover:bg-[#F3E7D8] sm:w-auto"
            >
              <ArrowLeft size={15} className="mr-2" />
              Explore Studios
            </Button>
          </Link>

        </div>

        {/* FOOTER MESSAGE */}
        <p className="mt-12 text-xs text-[#8A796B]">
          StudioSpace · Find your space. Create your story.
        </p>

      </div>
    </main>
  );
}