"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Camera,  MapPin,  Search,  SlidersHorizontal,  Sparkles,  Star, Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Studio } from "@/types/studio";

const categories = [
  "All",
  "Photo Studio",
  "Sound Stage",
  "Podcast Lounge",
  "Music Suite",
  "Art Workshop",
];

export default function ExploreStudiosPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const [studios, setStudios] = useState<Studio[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch studios from backend Express server
  useEffect(() => {
    async function fetchStudios() {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:8000/studios");
        if (!res.ok) {
          throw new Error("Failed to fetch studios");
        }
        const data = await res.json();
        setStudios(data);
      } catch (error) {
        console.error("Error fetching studios:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStudios();
  }, []);

  // Filter based on category select and search query input
  const filteredStudios = studios.filter((studio) => {
    const matchesCategory =
      selectedCategory === "All" || studio.category === selectedCategory;

    const matchesSearch =
      studio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      studio.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#FBF6EE]">
      {/* Page Heading & Hero Header */}
      <section className="px-4 pb-6 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#E5D3C0] bg-[#F3E7D8] px-3 py-1.5 text-sm font-bold text-[#4A291B]">
            <Sparkles size={16} />
            Discover & Reserve Studios
          </div>
          <h1 className="brand-font text-4xl font-bold tracking-tight text-[#4A291B] sm:text-5xl">
            Explore Creative Workspaces
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-[#78675B]">
            Find high-performance production spaces, photo studios, sound stages,
            and lounges ready for your next project.
          </p>

          {/* Search Bar & Category Filters */}
          <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative max-w-md flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A796B]"
              />
              <Input
                type="text"
                placeholder="Search studio title or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-2xl border-[#E5D3C0] bg-[#FFFCF7] pl-11 shadow-sm focus-visible:ring-[#4A291B]"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#4A291B] text-white shadow-sm"
                        : "border border-[#E5D3C0] bg-[#FFFCF7] text-[#655348] hover:bg-[#F3E7D8]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Grid Display Section */}
      <section className="px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            /* Branded Loading State */
            <div className="flex flex-col items-center justify-center py-24 text-[#78675B]">
              <Loader2 size={40} className="animate-spin text-[#4A291B]" />
              <p className="mt-4 font-semibold">Loading available studios...</p>
            </div>
          ) : filteredStudios.length === 0 ? (
            /* Branded Empty State */
            <div className="flex flex-col items-center justify-center rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] p-12 text-center shadow-sm">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F3E7D8] text-[#4A291B]">
                <SlidersHorizontal size={30} />
              </div>
              <h3 className="brand-font text-2xl font-bold text-[#4A291B]">
                No Studios Found
              </h3>
              <p className="mt-2 max-w-md text-[#78675B]">
                We couldn&apos;t find any workspace matching your filter criteria. Try adjusting your search term or select another category.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-6 rounded-xl bg-[#4A291B] font-bold text-white hover:bg-[#2C221E]"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            /* Studio Card Grid */
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredStudios.map((studio) => (
                <div
                  key={studio._id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Image & Category Badge */}
                  <div className="relative h-56 w-full overflow-hidden bg-[#F3E7D8]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={studio.imageUrl}
                      alt={studio.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04";
                      }}
                    />
                    <span className="absolute left-4 top-4 rounded-full border border-[#E5D3C0]/40 bg-[#FBF6EE]/90 px-3 py-1 text-xs font-bold text-[#4A291B] backdrop-blur-md">
                      {studio.category}
                    </span>
                  </div>

                  {/* Details Content */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-[#8A796B]">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} className="text-[#4A291B]" />
                          {studio.location}
                        </span>
                        <span className="flex items-center gap-1 rounded-md bg-[#F3E7D8] px-2 py-0.5 font-bold text-[#4A291B]">
                          <Star size={13} className="fill-[#4A291B] text-[#4A291B]" />
                          4.9
                        </span>
                      </div>

                      <h2 className="brand-font mt-3 text-xl font-bold text-[#4A291B] line-clamp-1">
                        {studio.title}
                      </h2>

                      <p className="mt-2 text-xs leading-5 text-[#78675B] line-clamp-2">
                        {studio.description}
                      </p>
                    </div>

                    {/* Pricing & CTA */}
                    <div className="mt-6 flex items-center justify-between border-t border-[#E5D3C0] pt-4">
                      <div>
                        <span className="text-2xl font-extrabold text-[#4A291B]">
                          ${studio.hourlyRate}
                        </span>
                        <span className="text-xs font-medium text-[#78675B]"> / hr</span>
                      </div>

                      <Link href={`/studios/${studio._id}`}>
                        <Button
                          variant="outline"
                          className="rounded-xl border-[#4A291B] font-bold text-[#4A291B] hover:bg-[#F3E7D8]"
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}