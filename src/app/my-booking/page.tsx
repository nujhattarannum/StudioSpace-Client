"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpDown,
  CalendarDays,
  Clock,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  studioId: string;
  studioName: string;
  category: string;
  location: string;
  imageUrl: string;
  bookingDate: string;
  time: string;
  duration: number;
  hourlyRate: number;
  totalPrice: number;
  status: "Confirmed" | "Pending" | "Completed";
  hostEmail: string;
}

const bookings: Booking[] = [
  {
    id: "BKG-1024",
    studioId: "studio-1",
    studioName: "The Creative Loft",
    category: "Photo Studio",
    location: "Dhanmondi, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
    bookingDate: "2026-11-12",
    time: "10:00 AM – 2:00 PM",
    duration: 4,
    hourlyRate: 40,
    totalPrice: 176,
    status: "Confirmed",
    hostEmail: "host1@studiospace.com",
  },
  {
    id: "BKG-1041",
    studioId: "studio-2",
    studioName: "SoundSphere Studio",
    category: "Sound Stage",
    location: "Gulshan, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1593078166034-9e2f2f5f2f5c",
    bookingDate: "2026-11-20",
    time: "1:00 PM – 4:00 PM",
    duration: 3,
    hourlyRate: 35,
    totalPrice: 115.5,
    status: "Pending",
    hostEmail: "host2@studiospace.com",
  },
  {
    id: "BKG-0996",
    studioId: "studio-3",
    studioName: "The Podcast Room",
    category: "Podcast Lounge",
    location: "Mirpur, Dhaka",
    imageUrl:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
    bookingDate: "2026-10-18",
    time: "11:00 AM – 1:00 PM",
    duration: 2,
    hourlyRate: 35,
    totalPrice: 77,
    status: "Completed",
    hostEmail: "host3@studiospace.com",
  },
];

type BookingFilter = "All" | "Upcoming" | "Past";

export default function MyBookingsPage() {
  const [activeFilter, setActiveFilter] =
    useState<BookingFilter>("All");

  const today = new Date("2026-11-04");

  // Separate upcoming and past bookings
  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.bookingDate) >= today
  );

  const pastBookings = bookings.filter(
    (booking) => new Date(booking.bookingDate) < today
  );

  // Display bookings according to selected tab
  const filteredBookings =
    activeFilter === "Upcoming"
      ? upcomingBookings
      : activeFilter === "Past"
        ? pastBookings
        : bookings;

  // Get the next upcoming booking
  const nextBooking = [...upcomingBookings].sort(
    (a, b) =>
      new Date(a.bookingDate).getTime() -
      new Date(b.bookingDate).getTime()
  )[0];

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format date for the next booking banner
  const formatNextDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#FBF6EE] px-4 py-10 md:px-12">
      <div className="mx-auto max-w-6xl space-y-7">

        {/* HEADER */}
        <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#8A796B]">
              Your Creative Calendar
            </p>

            <h1 className="brand-font mt-2 text-3xl font-extrabold text-[#4A291B]">
              My bookings
            </h1>

            <p className="mt-1 text-xs text-[#78675B]">
              Less planning. More creating.
            </p>
          </div>

          <Link href="/studios">
            <Button className="rounded-xl bg-[#4A291B] px-6 text-xs font-bold text-white hover:bg-[#2C221E]">
              Explore more studios
            </Button>
          </Link>
        </section>

        {/* NEXT BOOKING BANNER */}
        {nextBooking && (
          <section className="flex flex-col gap-3 rounded-2xl bg-[#F3E7D8] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-sm font-bold text-[#4A291B]">
                Your next great session is on the calendar.
              </h2>

              <p className="mt-1 text-[10px] text-[#78675B]">
                {nextBooking.studioName} ·{" "}
                {formatNextDate(nextBooking.bookingDate)} ·{" "}
                {nextBooking.time}
              </p>
            </div>

            <Link
              href={`/studios/${nextBooking.studioId}`}
              className="flex items-center gap-1 text-xs font-bold text-[#4A291B] hover:underline"
            >
              View booking <ArrowRight size={13} />
            </Link>
          </section>
        )}

        {/* FILTER TABS */}
        <section className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            {(
              [
                {
                  label: "All",
                  count: bookings.length,
                },
                {
                  label: "Upcoming",
                  count: upcomingBookings.length,
                },
                {
                  label: "Past",
                  count: pastBookings.length,
                },
              ] as const
            ).map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveFilter(tab.label)}
                className={`rounded-lg border px-5 py-2 text-[10px] font-bold transition ${
                  activeFilter === tab.label
                    ? "border-[#4A291B] bg-[#4A291B] text-white"
                    : "border-[#E5D3C0] bg-[#FFFCF7] text-[#4A291B] hover:bg-[#F3E7D8]"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <p className="flex items-center gap-1 text-[10px] text-[#8A796B]">
            <ArrowUpDown size={12} />
            Sorted by booking date
          </p>
        </section>

        {/* BOOKING CARDS */}
        <section className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <article
                key={booking.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-3 shadow-sm transition hover:shadow-md md:flex-row md:items-center"
              >
                {/* STUDIO IMAGE */}
                <img
                  src={booking.imageUrl}
                  alt={booking.studioName}
                  className="h-48 w-full rounded-xl object-cover md:h-28 md:w-44"
                />

                {/* BOOKING DETAILS */}
                <div className="min-w-0 flex-1 space-y-2">
                  <div>
                    <p className="text-[9px] font-medium text-[#8A796B]">
                      {booking.category} · #{booking.id}
                    </p>

                    <h2 className="mt-1 text-base font-bold text-[#4A291B]">
                      {booking.studioName}
                    </h2>

                    <p className="flex items-center gap-1 text-[10px] text-[#78675B]">
                      <MapPin size={11} />
                      {booking.location}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10px] text-[#78675B]">
                    <p className="font-semibold text-[#4A291B]">
                      {formatDate(booking.bookingDate)}
                    </p>

                    <p>{booking.time}</p>
                  </div>

                  <p className="text-[10px] text-[#8A796B]">
                    {booking.duration} hours × ${booking.hourlyRate}
                  </p>

                  {/* ACTION BUTTONS */}
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/studios/${booking.studioId}`}>
                      <Button
                        size="sm"
                        className="h-8 rounded-lg bg-[#4A291B] px-5 text-[10px] font-bold text-white hover:bg-[#2C221E]"
                      >
                        {booking.status === "Completed"
                          ? "Book again"
                          : "View booking"}
                      </Button>
                    </Link>

                    {booking.status === "Confirmed" && (
                      <a href={`mailto:${booking.hostEmail}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 rounded-lg border-[#E5D3C0] px-5 text-[10px] font-bold text-[#4A291B] hover:bg-[#F3E7D8]"
                        >
                          Contact host
                        </Button>
                      </a>
                    )}

                    {booking.status === "Pending" && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled
                        className="h-8 rounded-lg border-[#E5D3C0] px-5 text-[10px]"
                      >
                        Cancel request
                      </Button>
                    )}

                    {booking.status === "Completed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled
                        className="h-8 rounded-lg border-[#E5D3C0] px-5 text-[10px]"
                      >
                        Leave review
                      </Button>
                    )}
                  </div>
                </div>

                {/* PRICE AND STATUS */}
                <div className="flex flex-row items-center justify-between gap-4 border-t border-[#E5D3C0] pt-3 md:min-w-36 md:flex-col md:items-end md:justify-between md:self-stretch md:border-t-0 md:pt-0">
                  <span
                    className={`rounded-md px-3 py-1 text-[9px] font-bold ${
                      booking.status === "Confirmed"
                        ? "bg-[#F3E7D8] text-[#4A291B]"
                        : booking.status === "Pending"
                          ? "bg-[#F7EBD5] text-[#8A622B]"
                          : "bg-[#E8E8DC] text-[#536044]"
                    }`}
                  >
                    {booking.status}
                  </span>

                  <div className="text-right">
                    <p className="text-lg font-extrabold text-[#4A291B]">
                      ${booking.totalPrice.toFixed(2)}
                    </p>

                    <p className="text-[9px] text-[#8A796B]">
                      Total incl. service fee
                    </p>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#E5D3C0] bg-[#FFFCF7] py-16 text-center">
              <CalendarDays
                size={35}
                className="mx-auto text-[#8A796B]"
              />

              <h3 className="mt-3 font-bold text-[#4A291B]">
                No bookings found
              </h3>

              <p className="mt-1 text-xs text-[#78675B]">
                You don&apos;t have any {activeFilter.toLowerCase()} bookings.
              </p>

              <Link href="/studios">
                <Button className="mt-5 rounded-xl bg-[#4A291B] text-xs text-white hover:bg-[#2C221E]">
                  Explore studios
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* FOOTER / SUPPORT */}
        <section className="flex flex-col gap-3 border-t border-[#E5D3C0] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-sm font-bold text-[#4A291B]">
              Need help with a booking?
            </h2>

            <p className="mt-1 text-[10px] text-[#78675B]">
              Our creator support team is here for you.
            </p>
          </div>

          <a href="mailto:support@studiospace.com">
            <Button
              variant="outline"
              className="rounded-xl border-[#E5D3C0] bg-[#FFFCF7] px-6 text-xs font-bold text-[#4A291B] hover:bg-[#F3E7D8]"
            >
              Contact support
            </Button>
          </a>
        </section>

      </div>
    </main>
  );
}