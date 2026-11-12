"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  MapPin,  Star,  Check, Loader2,  Grid, ChevronLeft, ChevronRight,
} from "lucide-react";

import { Studio } from "@/types/studio";
import BookingCard from "@/components/BookingCard";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

export default function StudioDetailsPage({ params,}: { params: Promise<{ id: string }>;}) {

  const resolvedParams = use(params);
  const studioId = resolvedParams.id;

  const [studio, setStudio] = useState<Studio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => { 
    async function fetchStudioDetails() {
        const token = await  getTokenFromClient()
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${studioId}`,{
           headers: {
            authorization : `Bearer ${token}`
        },
        });
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


  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FBF6EE] dark:bg-[#211A16]">
        <div className="flex flex-col items-center gap-3 text-[#78675B] dark:text-[#C6B4A4]">
          <Loader2 size={40} className="animate-spin text-[#4A291B] dark:text-[#F3E7D8]" />
          <p className="font-semibold">Loading studio details...</p>
        </div>
      </main>
    );
  }

  if (!studio) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#FBF6EE] px-4 dark:bg-[#211A16]">
        <h2 className="brand-font text-3xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
          Studio Not Found
        </h2>
        <p className="mt-2 text-[#78675B] dark:text-[#C6B4A4]">
          The workspace you are looking for does not exist or has been removed.
        </p>
        <Link href="/studios" className="mt-6">
          <Button className="rounded-xl bg-[#4A291B] font-bold text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#E5D3C0]">
            Back to Explore
          </Button>
        </Link>
      </main>
    );
  }

  const reviews = studio.reviews || [];
  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0
      ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewCount).toFixed(1)
      : null;

  // Gather available images list safely
  const rawImages = studio.images && studio.images.length > 0 
    ? studio.images 
    : [studio.imageUrl].filter(Boolean);

  const mainImage = rawImages[0] || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04";
  const hasMultipleImages = rawImages.length > 1;

  // Carousel navigation handlers for right-hand side preview if more than 2 photos exist
  const secondaryImages = rawImages.slice(1);
  const currentCarouselImage = secondaryImages.length > 0 
    ? secondaryImages[activeImageIndex % secondaryImages.length] 
    : null;

  const nextCarouselImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveImageIndex((prev) => prev + 1);
  };

  const prevCarouselImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveImageIndex((prev) => (prev - 1 + secondaryImages.length) % secondaryImages.length);
  };

 return (
    <main className="min-h-screen bg-[#FBF6EE] pb-24 dark:bg-[#211A16]">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8A796B] dark:text-[#C6B4A4]">
            <Link href="/studios" className="hover:text-[#4A291B] dark:hover:text-[#F3E7D8]">
              Explore Studios
            </Link>
            <span>/</span>
            <span className="text-[#4A291B] dark:text-[#F3E7D8]">{studio.category}</span>
            <span>/</span>
            <span className="truncate max-w-[150px] sm:max-w-none text-[#4A291B] dark:text-[#F3E7D8]">
              {studio.title}
            </span>
          </div>

        </div>

        {/* Studio Title & Rating Header */}
        <div className="mt-6">
          <h1 className="brand-font text-3xl font-bold tracking-tight text-[#4A291B] dark:text-[#F3E7D8] sm:text-4xl">
            {studio.title}
          </h1>
          <div className="mt-2 flex items-center gap-3 text-sm font-semibold text-[#78675B] dark:text-[#C6B4A4]">
            <span className="flex items-center gap-1">
              <MapPin size={15} className="text-[#4A291B] dark:text-[#F3E7D8]" />
              {studio.location}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-bold text-[#4A291B] dark:text-[#F3E7D8]">
              <Star size={15} className="fill-[#4A291B] text-[#4A291B] dark:fill-[#F3E7D8] dark:text-[#F3E7D8]" />
              {reviewCount > 0 ? (
                <>
                  {averageRating}{" "}
                  <span className="font-medium text-[#78675B] dark:text-[#C6B4A4]">
                    ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                  </span>
                </>
              ) : (
                <span className="font-medium text-[#78675B] dark:text-[#C6B4A4]">No ratings yet</span>
              )}
            </span>

          </div>
        </div>
      </div>

      {/* Image Gallery Grid */}
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 gap-4 overflow-hidden rounded-3xl ${hasMultipleImages ? "md:grid-cols-3" : "grid-cols-1"}`}>
          {/* Main Large Image (Index 0) */}
          <div className={`relative h-72 md:h-[420px] ${hasMultipleImages ? "md:col-span-2" : "col-span-1"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mainImage}
              alt={studio.title}
              className="h-full w-full object-cover rounded-3xl"
            />
          </div>

          {/* Secondary Stacked Images / Carousel */}
          {hasMultipleImages && (
            <div className="hidden flex-col gap-4 md:flex">
              <div className="relative h-[202px] overflow-hidden rounded-2xl bg-[#F3E7D8] dark:bg-[#4A362A]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={rawImages[1]}
                  alt={`${studio.title} interior view`}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="relative h-[202px] overflow-hidden rounded-2xl bg-[#F3E7D8] dark:bg-[#4A362A]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentCarouselImage || rawImages[rawImages.length - 1]}
                  alt={`${studio.title} setup detail`}
                  className="h-full w-full object-cover"
                />

                {/* Carousel Controls if more than 2 photos */}
                {secondaryImages.length > 1 && (
                  <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 items-center justify-between">
                    <button
                      onClick={prevCarouselImage}
                      className="rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/70"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={nextCarouselImage}
                      className="rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition hover:bg-black/70"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                <div className="absolute bottom-3 right-3 rounded-xl border-[#E5D3C0] bg-[#FFFCF7]/90 px-3 py-1.5 text-xs font-bold text-[#4A291B] backdrop-blur-md dark:border-[#514034] dark:bg-[#211A16]/90 dark:text-[#F3E7D8]">
                  <Grid size={14} className="mr-1.5 inline" /> {rawImages.length} photos
                </div>
              </div>
            </div>
          )}

          {!hasMultipleImages && (
            <div className="text-center py-2 text-xs font-semibold text-[#8A796B] dark:text-[#C6B4A4]">
              No more photos available
            </div>
          )}
        </div>
      </section>

      {/* Main Grid: Content + Booking Widget */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Left Column: Details */}
          <div className="space-y-10 lg:col-span-2">
            {/* Quick Specs Cards */}
            <div>
              <h2 className="brand-font text-2xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                Room to bring your vision to life.
              </h2>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-[#8A796B] dark:text-[#C6B4A4]">
                {studio.category} • EXCLUSIVE USE
              </p>

              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="rounded-2xl border border-[#E5D3C0] bg-[#F3E7D8]/50 p-5 dark:border-[#514034] dark:bg-[#4A362A]">
                  <div className="brand-font text-xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                    {studio.capacity} guests
                  </div>
                  <div className="mt-1 text-xs text-[#78675B] dark:text-[#C6B4A4]">Capacity</div>
                </div>
                <div className="rounded-2xl border border-[#E5D3C0] bg-[#F3E7D8]/50 p-5 dark:border-[#514034] dark:bg-[#4A362A]">
                  <div className="brand-font text-xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                    1,200 sq ft
                  </div>
                  <div className="mt-1 text-xs text-[#78675B] dark:text-[#C6B4A4]">Floor space</div>
                </div>
                <div className="rounded-2xl border border-[#E5D3C0] bg-[#F3E7D8]/50 p-5 dark:border-[#514034] dark:bg-[#4A362A]">
                  <div className="brand-font text-xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                    ${studio.securityDeposit}
                  </div>
                  <div className="mt-1 text-xs text-[#78675B] dark:text-[#C6B4A4]">Refundable deposit</div>
                </div>
              </div>
            </div>

            {/* About this space */}
            <div className="border-t border-[#E5D3C0] pt-8 dark:border-[#514034]">
              <h3 className="brand-font text-xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                About this space
              </h3>
              <p className="mt-3 leading-7 text-[#78675B] dark:text-[#C6B4A4]">
                {studio.description}
              </p>
            </div>

            {/* Amenities List */}
            <div className="border-t border-[#E5D3C0] pt-8 dark:border-[#514034]">
              <h3 className="brand-font text-xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                Everything you need to create
              </h3>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {studio.amenities && studio.amenities.length > 0 ? (
                  studio.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-3 rounded-xl border border-[#E5D3C0] bg-[#FFFCF7] px-4 py-3 text-xs font-semibold text-[#4A291B] dark:border-[#514034] dark:bg-[#4A362A] dark:text-[#F3E7D8]"
                    >
                      <Check size={16} className="text-[#4A291B] dark:text-[#F3E7D8]" />
                      {amenity}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#78675B] dark:text-[#C6B4A4]">No amenities specified.</p>
                )}
              </div>
            </div>

            {/* Host Info Box */}
            <div className="rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] p-6 sm:p-8 dark:border-[#514034] dark:bg-[#4A362A]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8A796B] dark:text-[#C6B4A4]">
                    YOUR HOST
                  </span>
                  <h3 className="brand-font text-xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                    Hosted by {studio.ownerName || "Ayesha Rahman"}
                  </h3>
                  <p className="mt-1 text-xs text-[#78675B] dark:text-[#C6B4A4]">
                    ✓ Verified host • Hosting since 2023 • Usually responds within an hour
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="rounded-xl border-[#4A291B] font-bold text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#BDAA99] dark:text-[#F3E7D8] dark:hover:bg-[#30251F]"
                >
                  Contact host
                </Button>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-[#E5D3C0] pt-8 dark:border-[#514034]">
              <h3 className="brand-font text-xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                Loved by fellow creators
              </h3>
              <div className="mt-2 flex items-center gap-1 text-xs font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                <Star size={14} className="fill-[#4A291B] dark:fill-[#F3E7D8]" />
                {reviewCount > 0
                  ? `${averageRating} / 5 • ${reviewCount} verified ${reviewCount === 1 ? "review" : "reviews"}`
                  : "No ratings yet"}
              </div>

              <div className="mt-6 space-y-4">
                {reviewCount > 0 ? (
                  reviews.map((review, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-5 dark:border-[#514034] dark:bg-[#4A362A]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                          {review.author}
                        </span>
                        <span className="text-xs text-[#4A291B] dark:text-[#F3E7D8]">
                          {"★".repeat(review.rating || 5)}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#8A796B] dark:text-[#C6B4A4]">
                        {review.date}
                      </span>
                      <p className="mt-2 text-xs leading-5 text-[#78675B] dark:text-[#C6B4A4]">
                        &quot;{review.comment}&quot;
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-5 text-xs text-[#78675B] dark:border-[#514034] dark:bg-[#4A362A] dark:text-[#C6B4A4]">
                    No reviews yet.
                  </p>
                )}
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