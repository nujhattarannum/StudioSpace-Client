"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Camera,  MapPin,  Star,  Share2,  Heart,  Check,  ShieldCheck,  Loader2,  ArrowLeft, Grid,
} from "lucide-react";

import { Studio } from "@/types/studio";

import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import BookingCard from "@/components/BookingCard";


export default function StudioDetailsPage({ params,}: { params: Promise<{ id: string }>;}) {
  const resolvedParams = use(params);
  const studioId = resolvedParams.id;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => { async function fetchStudioDetails() {
      try {
        const res = await fetch(`http://localhost:8000/studios/${studioId}`);
        if (!res.ok) {
          throw new Error("Studio not found");
        }
        const data = await res.json();
        setStudio(data);
      } catch (error) {
        console.error("Error fetching studio details:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStudioDetails();
  }, [studioId]);


  const toggleSave = () => {
    setIsSaved(!isSaved);
    toast.info(isSaved ? "Removed from wishlist" : "Saved to wishlist!");
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FBF6EE]">
        <div className="flex flex-col items-center gap-3 text-[#78675B]">
          <Loader2 size={40} className="animate-spin text-[#4A291B]" />
          <p className="font-semibold">Loading studio details...</p>
        </div>
      </main>
    );
  }

  if (!studio) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FBF6EE] px-4">
        <h2 className="brand-font text-3xl font-bold text-[#4A291B]">
          Studio Not Found
        </h2>
        <p className="mt-2 text-[#78675B]">
          The workspace you are looking for does not exist or has been removed.
        </p>
        <Link href="/studios" className="mt-6">
          <Button className="rounded-xl bg-[#4A291B] font-bold text-white hover:bg-[#2C221E]">
            Back to Explore
          </Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF6EE] pb-24">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8A796B]">
            <Link href="/studios" className="hover:text-[#4A291B]">
              Explore Studios
            </Link>
            <span>/</span>
            <span className="text-[#4A291B]">{studio.category}</span>
            <span>/</span>
            <span className="truncate max-w-[150px] sm:max-w-none text-[#4A291B]">
              {studio.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
              }}
              className="h-10 rounded-full border-[#E5D3C0] bg-[#FFFCF7] px-4 text-xs font-bold text-[#4A291B] hover:bg-[#F3E7D8]">
              <Share2 size={14} className="mr-2" /> Share
            </Button>
            <Button
              variant="outline"
              onClick={toggleSave}
              className={`h-10 rounded-full border-[#E5D3C0] px-4 text-xs font-bold transition ${
                isSaved
                  ? "bg-[#4A291B] text-white"
                  : "bg-[#FFFCF7] text-[#4A291B] hover:bg-[#F3E7D8]"
              }`} >
              <Heart
                size={14}
                className={`mr-2 ${isSaved ? "fill-white text-white" : ""}`}
              />
              {isSaved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>

        {/* Studio Title & Rating Header */}
        <div className="mt-6">
          <h1 className="brand-font text-3xl font-bold tracking-tight text-[#4A291B] sm:text-4xl">
            {studio.title}
          </h1>
          <div className="mt-2 flex items-center gap-3 text-sm font-semibold text-[#78675B]">
            <span className="flex items-center gap-1">
              <MapPin size={15} className="text-[#4A291B]" />
              {studio.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-bold text-[#4A291B]">
              <Star size={15} className="fill-[#4A291B] text-[#4A291B]" />
              4.9 <span className="font-medium text-[#78675B]">(120 reviews)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Image Gallery Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 overflow-hidden rounded-3xl md:grid-cols-3">
          {/* Main Large Image */}
          <div className="relative h-80 md:col-span-2 md:h-[450px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={studio.imageUrl}
              alt={studio.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04";
              }}
            />
          </div>

          {/* Secondary Stacked Images */}
          <div className="hidden flex-col gap-4 md:flex">
            <div className="relative h-[217px] overflow-hidden rounded-2xl bg-[#F3E7D8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc"
                alt="Studio interior"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="relative h-[217px] overflow-hidden rounded-2xl bg-[#F3E7D8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
                alt="Studio setup"
                className="h-full w-full object-cover"
              />
              <Button
                variant="outline"
                className="absolute bottom-4 right-4 rounded-xl border-[#E5D3C0] bg-[#FFFCF7]/90 text-xs font-bold text-[#4A291B] backdrop-blur-md hover:bg-[#F3E7D8]"
              >
                <Grid size={14} className="mr-2" /> View all 8 photos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Content + Booking Widget */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column: Details */}
          <div className="space-y-10 lg:col-span-2">
            {/* Quick Specs Cards */}
            <div>
              <h2 className="brand-font text-2xl font-bold text-[#4A291B]">
                Room to bring your vision to life.
              </h2>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#8A796B]">
                {studio.category} • EXCLUSIVE USE
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-2xl border border-[#E5D3C0] bg-[#F3E7D8]/50 p-5">
                  <div className="brand-font text-xl font-bold text-[#4A291B]">
                    {studio.capacity} guests
                  </div>
                  <div className="mt-1 text-xs text-[#78675B]">Capacity</div>
                </div>
                <div className="rounded-2xl border border-[#E5D3C0] bg-[#F3E7D8]/50 p-5">
                  <div className="brand-font text-xl font-bold text-[#4A291B]">
                    1,200 sq ft
                  </div>
                  <div className="mt-1 text-xs text-[#78675B]">Floor space</div>
                </div>
                <div className="rounded-2xl border border-[#E5D3C0] bg-[#F3E7D8]/50 p-5">
                  <div className="brand-font text-xl font-bold text-[#4A291B]">
                    ${studio.securityDeposit}
                  </div>
                  <div className="mt-1 text-xs text-[#78675B]">Refundable deposit</div>
                </div>
              </div>
            </div>

            {/* About this space */}
            <div className="border-t border-[#E5D3C0] pt-8">
              <h3 className="brand-font text-xl font-bold text-[#4A291B]">
                About this space
              </h3>
              <p className="mt-3 leading-7 text-[#78675B]">
                {studio.description}
              </p>
            </div>

            {/* Amenities List */}
            <div className="border-t border-[#E5D3C0] pt-8">
              <h3 className="brand-font text-xl font-bold text-[#4A291B]">
                Everything you need to create
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {studio.amenities && studio.amenities.length > 0 ? (
                  studio.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl border border-[#E5D3C0] bg-[#FFFCF7] px-4 py-3 text-xs font-semibold text-[#4A291B]"
                    >
                      <Check size={16} className="text-[#4A291B]" />
                      {amenity}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#78675B]">No amenities specified.</p>
                )}
              </div>
            </div>

            {/* Host Info Box */}
            <div className="rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A796B]">
                    YOUR HOST
                  </span>
                  <h3 className="brand-font text-xl font-bold text-[#4A291B]">
                    Hosted by {studio.ownerName || "Ayesha Rahman"}
                  </h3>
                  <p className="mt-1 text-xs text-[#78675B]">
                    ✓ Verified host • Hosting since 2023 • Usually responds within an hour
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-xl border-[#4A291B] font-bold text-[#4A291B] hover:bg-[#F3E7D8]"
                >
                  Contact host
                </Button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-[#E5D3C0] pt-8">
              <h3 className="brand-font text-xl font-bold text-[#4A291B]">
                Loved by fellow creators
              </h3>
              <div className="mt-2 flex items-center gap-1 text-xs font-bold text-[#4A291B]">
                <Star size={14} className="fill-[#4A291B]" />
                4.9 / 5 • 120 verified reviews
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#4A291B]">Nadia Islam</span>
                    <span className="text-xs text-[#4A291B]">★★★★★</span>
                  </div>
                  <span className="text-[11px] text-[#8A796B]">October 18, 2026</span>
                  <p className="mt-2 text-xs leading-5 text-[#78675B]">
                    &quot;Beautiful natural light and a thoughtful setup. Everything was ready when we arrived. We&apos;ll definitely be back!&quot;
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#4A291B]">Rafi Ahmed</span>
                    <span className="text-xs text-[#4A291B]">★★★★★</span>
                  </div>
                  <span className="text-[11px] text-[#8A796B]">October 9, 2026</span>
                  <p className="mt-2 text-xs leading-5 text-[#78675B]">
                    &quot;Ayesha was incredibly helpful. A quiet, versatile space for our product campaign — highly recommended.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Box */}
          <BookingCard studio = {studio}/>
        </div>
      </section>
    </main>
  );
}