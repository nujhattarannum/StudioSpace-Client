
import Link from "next/link";
import {
  Camera,
  Users,
  Lightbulb,
  Target,
  ShieldCheck,
  Search,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const audiences = [
  {
    icon: Camera,
    title: "Photographers & Videographers",
    description:
      "Find professional photography studios and production spaces for your next shoot.",
  },
  {
    icon: Lightbulb,
    title: "Artists & Creators",
    description:
      "Discover inspiring workspaces where you can bring your creative ideas to life.",
  },
  {
    icon: Users,
    title: "Podcasters & Musicians",
    description:
      "Explore recording rooms, sound stages, and music production spaces.",
  },
  {
    icon: Target,
    title: "Studio Owners & Hosts",
    description:
      "Share your creative workspace and connect with people looking for a place to create.",
  },
];

const features = [
  {
    icon: Search,
    title: "Easy Discovery",
    description:
      "Browse different creative spaces and find a workspace that suits your project.",
  },
  {
    icon: CalendarCheck,
    title: "Convenient Booking",
    description:
      "Make your studio search and booking experience simple and organized.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Information",
    description:
      "Explore studio details, facilities, locations, and pricing before booking.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FBF6EE] dark:bg-[#211A16]">

      {/* HERO SECTION */}
      <section className="px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#8A796B] dark:text-[#C6B4A4]">
            GET TO KNOW US
          </p>

          <h1 className="brand-font text-4xl font-extrabold leading-tight text-[#4A291B] dark:text-[#F3E7D8] md:text-6xl">
            A Space for Every
            <span className="block">Creative Vision.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#78675B] dark:text-[#C6B4A4] md:text-base">
            StudioSpace connects creative people with inspiring
            workspaces. Whether you are a photographer, musician,
            podcaster, or studio owner, we make it easier to discover
            spaces where ideas become reality.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/studios">
              <Button className="rounded-xl bg-[#4A291B] px-7 py-6 font-bold text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#E5D3C0]">
                Explore Studios
                <ArrowRight size={17} className="ml-2" />
              </Button>
            </Link>

            <Link href="/add-studio">
              <Button
                variant="outline"
                className="rounded-xl border-[#E5D3C0] bg-[#FFFCF7] px-7 py-6 font-bold text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#665247] dark:bg-[#30251F] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
              >
                Become a Host
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="border-y border-[#E5D3C0] bg-[#FFFCF7] px-4 py-16 dark:border-[#514034] dark:bg-[#30251F] sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">

          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#8A796B] dark:text-[#C6B4A4]">
              ABOUT STUDIOSPACE
            </p>

            <h2 className="brand-font text-3xl font-extrabold leading-tight text-[#4A291B] dark:text-[#F3E7D8]">
              Bringing Creative People and Spaces Together
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#78675B] dark:text-[#C6B4A4]">
              Finding the right environment can make a huge difference
              to a creative project. But discovering and arranging access
              to the right studio can be difficult.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#78675B] dark:text-[#C6B4A4]">
              StudioSpace aims to make that process easier by connecting
              people who need creative workspaces with hosts who have
              spaces to share. From photography studios to podcast rooms
              and music suites, we bring different creative environments
              together in one place.
            </p>
          </div>

          <div className="flex min-h-72 items-center justify-center rounded-3xl bg-[#F3E7D8] p-10 dark:bg-[#4A362A]">
            <div className="text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-[#4A291B] text-[#F3E7D8] dark:bg-[#F3E7D8] dark:text-[#2C221E]">
                <Camera size={48} />
              </div>

              <h3 className="brand-font mt-6 text-2xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                Create Without Limits
              </h3>

              <p className="mt-2 text-sm text-[#78675B] dark:text-[#C6B4A4]">
                Discover a space that inspires your next idea.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* OUR MISSION */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">

          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E7D8] text-[#4A291B] dark:bg-[#4A362A] dark:text-[#F3E7D8]">
            <Target size={28} />
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#8A796B] dark:text-[#C6B4A4]">
            OUR MISSION
          </p>

          <h2 className="brand-font text-3xl font-extrabold text-[#4A291B] dark:text-[#F3E7D8] md:text-4xl">
            Making Creative Spaces Accessible to Everyone
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#78675B] dark:text-[#C6B4A4]">
            Our mission is to simplify the way people discover and book
            creative workspaces. We want creators to spend less time
            searching for the right environment and more time doing
            what they love.
          </p>

        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="bg-[#F3E7D8]/50 px-4 py-16 dark:bg-[#30251F] sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#8A796B] dark:text-[#C6B4A4]">
              OUR COMMUNITY
            </p>

            <h2 className="brand-font text-3xl font-extrabold text-[#4A291B] dark:text-[#F3E7D8]">
              Who We Serve
            </h2>

            <p className="mt-3 text-sm text-[#78675B] dark:text-[#C6B4A4]">
              A creative community with different ideas and shared ambitions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-6 dark:border-[#514034] dark:bg-[#211A16]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#F3E7D8] text-[#4A291B] dark:bg-[#4A362A] dark:text-[#F3E7D8]">
                    <Icon size={24} />
                  </div>

                  <h3 className="mb-3 text-base font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-6 text-[#78675B] dark:text-[#C6B4A4]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#8A796B] dark:text-[#C6B4A4]">
              THE STUDIOSPACE EXPERIENCE
            </p>

            <h2 className="brand-font text-3xl font-extrabold text-[#4A291B] dark:text-[#F3E7D8]">
              Why Choose StudioSpace?
            </h2>

            <p className="mt-3 text-sm text-[#78675B] dark:text-[#C6B4A4]">
              Everything you need to find and book your next creative space.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-7 text-center dark:border-[#514034] dark:bg-[#30251F]"
                >
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E7D8] text-[#4A291B] dark:bg-[#4A362A] dark:text-[#F3E7D8]">
                    <Icon size={27} />
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-6 text-[#78675B] dark:text-[#C6B4A4]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-3xl bg-[#2C221E] px-6 py-14 text-center dark:bg-[#4A362A] md:px-12">

          <h2 className="brand-font text-3xl font-extrabold text-[#FFFCF7] md:text-4xl">
            Your Next Creative Project Starts Here.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#C6B4A4]">
            Find the perfect workspace, explore new possibilities,
            and bring your creative vision to life with StudioSpace.
          </p>

          <div className="mt-8 flex justify-center">
  <Link href="/add-studio">
    <Button
      variant="outline"
      className="rounded-xl border-[#C6B4A4] bg-transparent px-7 py-6 font-bold text-[#F3E7D8] hover:bg-[#4A362A]"
    >
      List Your Studio
    </Button>
  </Link>
</div>

        </div>
      </section>

    </main>
  );
}
