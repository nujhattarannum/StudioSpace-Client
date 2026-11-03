import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StudioCardProps {
  id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageUrl: string;
  rating?: number;
  reviewsCount?: number;
}

export default function StudioCard({
  id,
  title,
  category,
  hourlyRate,
  location,
  imageUrl,
  rating = 4.9,
  reviewsCount = 120,}: StudioCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image & Category Badge */}
      <div className="relative h-48 w-full overflow-hidden bg-[#F3E7D8]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04";
          }}
        />
        <span className="absolute left-4 top-4 rounded-full border border-[#E5D3C0]/40 bg-[#FBF6EE]/90 px-3 py-1 text-xs font-bold text-[#4A291B] backdrop-blur-md">
          {category}
        </span>
      </div>

      {/* Details Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold text-[#8A796B]">
            <span className="flex items-center gap-1">
              <MapPin size={13} className="text-[#4A291B]" />
              {location}
            </span>
            <span className="flex items-center gap-1 rounded-md bg-[#F3E7D8] px-2 py-0.5 font-bold text-[#4A291B]">
              <Star size={12} className="fill-[#4A291B] text-[#4A291B]" />
              {rating} <span className="text-[10px] text-[#78675B]">({reviewsCount})</span>
            </span>
          </div>

          <h3 className="brand-font mt-2 text-lg font-bold text-[#4A291B] line-clamp-1">
            {title}
          </h3>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-4 flex items-center justify-between border-t border-[#E5D3C0] pt-4">
          <div>
            <span className="text-xl font-extrabold text-[#4A291B]">
              ${hourlyRate}
            </span>
            <span className="text-xs font-medium text-[#78675B]"> / hr</span>
          </div>

          <Link href={`/studios/${id}`}>
            <Button
              variant="outline"
              className="rounded-xl border-[#4A291B] px-4 py-2 text-xs font-bold text-[#4A291B] hover:bg-[#F3E7D8]"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}