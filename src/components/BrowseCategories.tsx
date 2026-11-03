import Link from "next/link";
import { Camera, Film, Mic, Music, Palette, Sparkles } from "lucide-react";

const categoryCards = [
  { name: "Photo Studios", subtitle: "Backdrops & Cyc Walls", icon: Camera, query: "Photo Studio" },
  { name: "Sound Stages", subtitle: "Film sets & Green Screens", icon: Film, query: "Sound Stage" },
  { name: "Podcast Lounges", subtitle: "Multi-mic Audio Rigs", icon: Mic, query: "Podcast Lounge" },
  { name: "Music Suites", subtitle: "DAW Workstations & Soundproofing", icon: Music, query: "Music Suite" },
  { name: "Art Workshops", subtitle: "Easels & Craft Zones", icon: Palette, query: "Art Workshop" },
];

export default function BrowseCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#E5D3C0] bg-[#F3E7D8] px-3 py-1 text-xs font-bold text-[#4A291B]">
          <Sparkles size={14} /> Curated Spaces
        </div>
        <h2 className="brand-font mt-2 text-3xl font-bold text-[#4A291B]">
          Browse by Studio Category
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categoryCards.map((cat) => {
          const IconComponent = cat.icon;
          return (
            <Link
              key={cat.name}
              href={`/studios?category=${encodeURIComponent(cat.query)}`}
              className="group flex flex-col items-center rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] p-6 text-center transition-all hover:-translate-y-1 hover:bg-[#F3E7D8]/60 hover:shadow-sm"
            >
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E7D8] text-[#4A291B] transition group-hover:bg-[#4A291B] group-hover:text-white">
                <IconComponent size={26} />
              </div>
              <h3 className="brand-font font-bold text-[#4A291B]">{cat.name}</h3>
              <p className="mt-1 text-xs text-[#78675B]">{cat.subtitle}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}