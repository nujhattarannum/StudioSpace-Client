"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import StudioCard from "@/components/StudioCard";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageUrl: string;
}

export default function FeaturedStudios() {
  const [featuredStudios, setFeaturedStudios] = useState<Studio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("http://localhost:8000/studios");
        const data = await res.json();
        setFeaturedStudios(data.slice(0, 6)); // Limit to 6 studios as required
      } catch (error) {
        console.error("Failed to fetch featured studios:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="brand-font text-3xl font-bold text-[#4A291B]">
            Featured Studios
          </h2>
          <p className="mt-1 text-sm text-[#78675B]">
            Top-rated and newest workspace productions available right now.
          </p>
        </div>
        <Link
          href="/studios"
          className="group inline-flex items-center gap-1 text-sm font-bold text-[#4A291B] transition hover:underline"
        >
          View All Studios <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 animate-pulse rounded-3xl bg-[#E5D3C0]/40" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredStudios.map((studio) => (
            <StudioCard
              key={studio._id}
              id={studio._id}
              title={studio.title}
              category={studio.category}
              hourlyRate={studio.hourlyRate}
              location={studio.location}
              imageUrl={studio.imageUrl}
            />
          ))}
        </div>
      )}
    </section>
  );
}