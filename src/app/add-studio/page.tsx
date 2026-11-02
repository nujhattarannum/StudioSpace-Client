"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Camera,
  ImagePlus,
  MapPin,
  Music,
  Plus,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Photo Studio",
  "Sound Stage",
  "Podcast Lounge",
  "Music Suite",
  "Art Workshop",
];

const amenities = [
  "Wi-Fi",
  "Air Conditioning",
  "Professional Lighting",
  "Backdrops",
  "Parking",
  "Sound System",
  "Projector",
  "Kitchenette",
  "Soundproofing",
  "Makeup Room",
  "Restroom",
  "Natural Light",
];

export default function AddStudioPage() {
  const router = useRouter();

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [imageUrl, setImageUrl] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  function toggleAmenity(amenity: string) {
    setSelectedAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const studio = {
      title: String(formData.get("title") ?? "").trim(),
      category: String(formData.get("category") ?? ""),
      hourlyRate: Number(formData.get("hourlyRate")),
      securityDeposit: Number(formData.get("securityDeposit")),
      capacity: Number(formData.get("capacity")),
      location: String(formData.get("location") ?? "").trim(),
      imageUrl: String(formData.get("imageUrl") ?? "").trim(),
      amenities: selectedAmenities,
      description: String(formData.get("description") ?? "").trim(),
    };

    if (
      !studio.title ||
      !studio.category ||
      !studio.location ||
      !studio.description
    ) {
      alert("Please complete all required fields.");
      return;
    }

    if (!Number.isFinite(studio.hourlyRate) || studio.hourlyRate <= 0) {
      alert("Please enter a valid hourly rate.");
      return;
    }

    if (
      !Number.isFinite(studio.securityDeposit) ||
      studio.securityDeposit < 0
    ) {
      alert("Please enter a valid security deposit.");
      return;
    }

    if (!Number.isInteger(studio.capacity) || studio.capacity < 1) {
      alert("Capacity must be at least one person.");
      return;
    }

    setIsSubmitting(true);

    try {
        console.log("Submitting studio object:", studio);

      const res = await fetch("http://localhost:8000/add-studio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studio),
      });

      if (!res.ok) {
        throw new Error("Failed to create studio");
      }

          const data = await res.json();
      console.log("Server response:", data);

      alert("Studio published successfully!");
  
    } catch (error) {
      console.error("Unable to create studio:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FBF6EE]">
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-[#E5D3C0] bg-[#FBF6EE]/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#4A291B]" >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3E7D8]">
              <Camera size={25} />
            </div>

            <span className="brand-font text-2xl font-bold">
              StudioSpace
            </span>
          </Link>

          <div className="hidden items-center gap-7 text-sm font-semibold text-[#78675B] md:flex">
            <Link
              href="/"
              className="transition hover:text-[#4A291B]" >
              Home
            </Link>

            <Link
              href="/studios"
              className="transition hover:text-[#4A291B]" >
              Explore Studios
            </Link>

            <Link
              href="/my-listings"
              className="text-[#4A291B] underline decoration-2 underline-offset-8" >
              My Listings
            </Link>
          </div>

          <Link href="/my-listings">
            <Button
              variant="outline"
              className="rounded-xl border-[#E5D3C0] text-[#4A291B] hover:bg-[#F3E7D8]">
              My Listings
            </Button>
          </Link>
        </nav>
      </header>

      {/* Page heading */}
      <section className="px-4 pb-5 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/my-listings"
            className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[#78675B] hover:text-[#4A291B]" >
            <ArrowLeft size={17} />
            Back to My Listings
          </Link>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E5D3C0] bg-[#F3E7D8] px-3 py-1.5 text-sm font-bold text-[#4A291B]">
                <Sparkles size={16} />
                Share your creative space
              </div>

              <h1 className="brand-font text-4xl font-bold tracking-tight text-[#4A291B] sm:text-5xl">
                List Your Studio
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-[#78675B]">
                Turn your creative space into an opportunity.
                Tell creators what makes your studio special.
              </p>
            </div>

            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F3E7D8] text-[#4A291B] sm:flex">
              <Music size={34} />
            </div>
          </div>
        </div>
      </section>

      {/* Studio form */}
      <section className="px-4 pb-16 pt-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <form
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] shadow-sm" >
            {/* Studio details */}
            <div className="border-b border-[#E5D3C0] p-5 sm:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3E7D8] text-[#4A291B]">
                  <Camera size={23} />
                </div>

                <div>
                  <h2 className="brand-font text-2xl font-bold text-[#4A291B]">
                    Studio Details
                  </h2>

                  <p className="mt-1 text-sm text-[#78675B]">
                    Give your studio a name and choose its category.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Title */}
                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-sm font-bold text-[#4A291B]" >
                    Studio title *
                  </label>

                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. The Loft Studio"
                    required
                    maxLength={100}
                    className="h-12 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] focus-visible:ring-[#4A291B]" />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label
                    htmlFor="category"
                    className="text-sm font-bold text-[#4A291B]" >
                    Category *
                  </label>

                  <select
                    id="category"
                    name="category"
                    required
                    defaultValue=""
                    className="h-12 w-full rounded-xl border border-[#E5D3C0] bg-[#FBF6EE] px-3 text-sm text-[#4A291B] outline-none focus:ring-2 focus:ring-[#4A291B]" >
                    <option value="" disabled>
                      Select a category
                    </option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Hourly rate */}
                <div className="space-y-2">
                  <label
                    htmlFor="hourlyRate"
                    className="text-sm font-bold text-[#4A291B]">
                        Hourly rate ($) *
                  </label>

                  <Input
                    id="hourlyRate"
                    name="hourlyRate"
                    type="number"
                    placeholder="e.g. 50"
                    required
                    className="h-12 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] focus-visible:ring-[#4A291B]" />
                </div>

                {/* Deposit */}
                <div className="space-y-2">
                  <label
                    htmlFor="securityDeposit"
                    className="text-sm font-bold text-[#4A291B]">
                    Security deposit ($) *
                  </label>

                  <Input
                    id="securityDeposit"
                    name="securityDeposit"
                    type="number"
                    placeholder="e.g. 100"
                    required
                    className="h-12 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] focus-visible:ring-[#4A291B]"/>
                </div>

                {/* Capacity */}
                <div className="space-y-2">
                  <label
                    htmlFor="capacity"
                    className="text-sm font-bold text-[#4A291B]">
                    Maximum capacity *
                  </label>

                  <select
                    id="capacity"
                    name="capacity"
                    defaultValue=""
                    required
                    className="h-12 w-full rounded-xl border border-[#E5D3C0] bg-[#FBF6EE] px-3 text-sm text-[#4A291B] outline-none focus:ring-2 focus:ring-[#4A291B]" >
                    <option value="" disabled>
                      Select capacity
                    </option>

                    {[1, 2, 4, 6, 8, 10, 15, 20, 30, 50].map((number) => (
                      <option key={number} value={number}>
                        {number} {number === 1 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <label
                    htmlFor="location"
                    className="text-sm font-bold text-[#4A291B]" >
                    Location *
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8A796B]"/>

                    <Input
                      id="location"
                      name="location"
                      placeholder="e.g. Gulshan, Dhaka"
                      required
                      maxLength={200}
                      className="h-12 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] pl-10 focus-visible:ring-[#4A291B]"  />
                  </div>
                </div>
              </div>
            </div>

            {/* Studio image */}
            <div className="border-b border-[#E5D3C0] p-5 sm:p-8">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3E7D8] text-[#4A291B]">
                  <ImagePlus size={23} />
                </div>

                <div>
                  <h2 className="brand-font text-2xl font-bold text-[#4A291B]">
                    Studio Photos
                  </h2>

                  <p className="mt-1 text-sm text-[#78675B]">
                    Add an image URL to showcase your space.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="imageUrl"
                  className="text-sm font-bold text-[#4A291B]"  >
                  Main image URL *
                </label>

                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/studio.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="h-12 rounded-xl border-[#E5D3C0] bg-[#FBF6EE] focus-visible:ring-[#4A291B]"  />
              </div>

              {imageUrl && (
                <div className="mt-4 overflow-hidden rounded-2xl border border-[#E5D3C0] bg-[#F3E7D8]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Studio image preview"
                    className="h-64 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                    onLoad={(e) => {
                      e.currentTarget.style.visibility = "visible";
                    }} />
                </div>
              )}
            </div>

            {/* Amenities */}
            <div className="border-b border-[#E5D3C0] p-5 sm:p-8">
              <div className="mb-5">
                <h2 className="brand-font text-2xl font-bold text-[#4A291B]">
                  Amenities & Equipment
                </h2>

                <p className="mt-1 text-sm text-[#78675B]">
                  Select everything available in your studio.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {amenities.map((amenity) => {
                  const checked = selectedAmenities.includes(amenity);

                  return (
                    <label
                      key={amenity}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition ${
                        checked
                          ? "border-[#4A291B] bg-[#F3E7D8] text-[#4A291B]"
                          : "border-[#E5D3C0] bg-[#FBF6EE] text-[#655348] hover:bg-[#F3E7D8]/60"
                      }`}  >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAmenity(amenity)}
                        className="h-4 w-4 shrink-0 accent-[#4A291B]" />

                      <span className="font-semibold">{amenity}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="p-5 sm:p-8">
              <div className="mb-5">
                <h2 className="brand-font text-2xl font-bold text-[#4A291B]">
                  Tell Your Story
                </h2>

                <p className="mt-1 text-sm text-[#78675B]">
                  Help creators imagine what they can make here.
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm font-bold text-[#4A291B]" >
                  Studio description *
                </label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your space, equipment, atmosphere, accessibility, and what makes it special..."
                  required
                  minLength={20}
                  maxLength={3000}
                  className="min-h-40 resize-y rounded-xl border-[#E5D3C0] bg-[#FBF6EE] leading-7 focus-visible:ring-[#4A291B]" />

                <p className="text-xs text-[#8A796B]">
                  Include useful details about your studio and the equipment
                  creators can use.
                </p>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#E5D3C0] pt-6 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/my-listings")}
                  className="h-12 rounded-xl border-[#4A291B] px-6 font-bold text-[#4A291B] hover:bg-[#F3E7D8]" >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 rounded-xl bg-[#4A291B] px-7 font-bold text-white hover:bg-[#2C221E]" >
                  <Plus size={18} className="mr-2" />
                  {isSubmitting ? "Publishing..." : "Add Studio"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}