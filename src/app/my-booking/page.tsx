"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpDown,
  CalendarDays,
  MapPin,
  Loader2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

interface Booking {
  _id: string;
  studioId: string;
  studioTitle: string;
  category?: string;
  location: string;
  studioImage: string;
  bookedDate: string;
  Time: string;
  duration?: number;
  hourlyRate: number;
  totalPrice?: number;
  status?: "Confirmed" | "Pending" | "Completed" | "Cancelled";
  hostEmail?: string;
  guest: number;
  email: string;
}

type BookingFilter = "All" | "Upcoming" | "Past";

export default function MyBookingsPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<BookingFilter>("All");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Fetch bookings for the logged-in user
   useEffect(() => {
  async function fetchUserBookings() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/my-booking/${user?.email}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!sessionLoading && user?.email) {
    fetchUserBookings();
  }
}, [user?.email, sessionLoading]);

  // Cancel a pending booking
  const handleCancelBooking = async (bookingId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setCancellingId(bookingId);

      const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/my-booking/${bookingId}/cancel`,
        {
          method: "PATCH",
        }
      );
   
    const data = await res.json()
    console.log(data)

  

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      // Update the booking status in the frontend
      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );

      toast.success("Booking cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Could not cancel the booking. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  // Use current system date for comparison
  const today = new Date();

  // Separate upcoming and past bookings
  const upcomingBookings = bookings.filter(
    (booking) => new Date(booking.bookedDate) >= today
  );

  const pastBookings = bookings.filter(
    (booking) => new Date(booking.bookedDate) < today
  );

  // Display bookings according to selected tab
  const filteredBookings =
    activeFilter === "Upcoming"
      ? upcomingBookings
      : activeFilter === "Past"
        ? pastBookings
        : bookings;

  // Get the next upcoming booking
  const nextBooking = [...upcomingBookings]
    .filter((booking) => booking.status !== "Cancelled")
    .sort(
      (a, b) =>
        new Date(a.bookedDate).getTime() -
        new Date(b.bookedDate).getTime()
    )[0];

  // Format date
  const formatDate = (date: string) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format date for the next booking banner
  const formatNextDate = (date: string) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Loading screen
  if (sessionLoading || (user && isLoading)) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FBF6EE] dark:bg-[#211A16]">
        <div className="flex flex-col items-center gap-3 text-[#78675B] dark:text-[#C6B4A4]">
          <Loader2
            size={40}
            className="animate-spin text-[#4A291B] dark:text-[#F3E7D8]"
          />
          <p className="text-sm font-semibold">
            Loading your creative calendar...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF6EE] px-4 py-10 dark:bg-[#211A16] md:px-12">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* HEADER */}
        <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#8A796B] dark:text-[#C6B4A4]">
              Your Creative Calendar
            </p>

            <h1 className="brand-font mt-2 text-3xl font-extrabold text-[#4A291B] dark:text-[#F3E7D8]">
              My Bookings
            </h1>

            <p className="mt-2 text-sm text-[#78675B] dark:text-[#C6B4A4]">
              Manage your studio reservations in one place.
            </p>
          </div>

          <Link href="/studios">
            <Button className="rounded-xl bg-[#4A291B] px-6 py-5 text-sm font-bold text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#E5D3C0]">
              Explore More Studios
            </Button>
          </Link>
        </section>

        {/* NEXT BOOKING BANNER */}
        {nextBooking && (
          <section className="flex flex-col gap-3 rounded-2xl bg-[#F3E7D8] p-5 dark:bg-[#4A362A] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-base font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                Your next great session is on the calendar.
              </h2>

              <p className="mt-2 text-sm text-[#78675B] dark:text-[#C6B4A4]">
                {nextBooking.studioTitle} ·{" "}
                {formatNextDate(nextBooking.bookedDate)} · {nextBooking.Time}
              </p>
            </div>

            <Link
              href={`/studios/${nextBooking.studioId}`}
              className="flex items-center gap-2 text-sm font-bold text-[#4A291B] hover:underline dark:text-[#F3E7D8]"
            >
              View Studio <ArrowRight size={16} />
            </Link>
          </section>
        )}

        {/* FILTER TABS */}
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { label: "All", count: bookings.length },
                { label: "Upcoming", count: upcomingBookings.length },
                { label: "Past", count: pastBookings.length },
              ] as const
            ).map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveFilter(tab.label)}
                className={`rounded-lg border px-5 py-3 text-sm font-bold transition ${
                  activeFilter === tab.label
                    ? "border-[#4A291B] bg-[#4A291B] text-white dark:border-[#F3E7D8] dark:bg-[#F3E7D8] dark:text-[#2C221E]"
                    : "border-[#E5D3C0] bg-[#FFFCF7] text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#514034] dark:bg-[#30251F] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>

          <p className="flex items-center gap-2 text-sm text-[#8A796B] dark:text-[#C6B4A4]">
            <ArrowUpDown size={15} />
            Sorted by booking date
          </p>
        </section>

        {/* BOOKING CARDS */}
        <section className="space-y-5">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => {
              // New bookings should be saved as Pending by the backend.
              const bookingStatus = booking.status || "Pending";

              const computedPrice =
                booking.totalPrice || booking.hourlyRate * 3;

              return (
                <article
                  key={booking._id}
                  className="flex flex-col gap-5 rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-4 shadow-sm transition hover:shadow-md dark:border-[#514034] dark:bg-[#30251F] md:flex-row md:items-center"
                >
                  {/* STUDIO IMAGE */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      booking.studioImage ||
                      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"
                    }
                    alt={booking.studioTitle}
                    className="h-52 w-full rounded-xl object-cover md:h-36 md:w-48"
                  />

                  {/* BOOKING DETAILS */}
                  <div className="min-w-0 flex-1 space-y-3">
                    <div>
                      <p className="text-xs font-medium text-[#8A796B] dark:text-[#C6B4A4]">
                        {booking.category || "Studio Workspace"}
                      </p>

                      <h2 className="mt-1 text-lg font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                        {booking.studioTitle}
                      </h2>

                      <p className="mt-1 flex items-center gap-2 text-sm text-[#78675B] dark:text-[#C6B4A4]">
                        <MapPin size={15} />
                        {booking.location}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#78675B] dark:text-[#C6B4A4]">
                      <p className="font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                        {formatDate(booking.bookedDate)}
                      </p>

                      <p>{booking.Time}</p>
                    </div>

                    <p className="text-sm text-[#8A796B] dark:text-[#C6B4A4]">
                      {booking.guest}{" "}
                      {booking.guest === 1 ? "guest" : "guests"} · $
                      {booking.hourlyRate} / hr
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/studios/${booking.studioId}`}>
                        <Button
                          size="sm"
                          className="h-10 rounded-lg bg-[#4A291B] px-5 text-sm font-bold text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#E5D3C0]"
                        >
                          {bookingStatus === "Completed"
                            ? "Book Again"
                            : "View Studio"}
                        </Button>
                      </Link>

                      {bookingStatus === "Pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={cancellingId === booking._id}
                          onClick={() => handleCancelBooking(booking._id)}
                          className="h-10 rounded-lg border-red-300 px-5 text-sm font-bold text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950"
                        >
                          {cancellingId === booking._id ? (
                            <>
                              <Loader2 size={15} className="mr-2 animate-spin" />
                              Cancelling...
                            </>
                          ) : (
                            <>
                              <XCircle size={15} className="mr-2" />
                              Cancel Booking
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* PRICE AND STATUS */}
                  <div className="flex flex-row items-center justify-between gap-4 border-t border-[#E5D3C0] pt-4 dark:border-[#514034] md:min-w-40 md:flex-col md:items-end md:justify-between md:self-stretch md:border-t-0 md:pt-0">
                    <span
                      className={`rounded-md px-4 py-2 text-xs font-bold ${
                        bookingStatus === "Confirmed"
                          ? "bg-[#E1EEDC] text-[#365B32] dark:bg-[#354033] dark:text-[#C4D1B2]"
                          : bookingStatus === "Pending"
                            ? "bg-[#F7EBD5] text-[#8A622B] dark:bg-[#4A362A] dark:text-[#E5C58F]"
                            : bookingStatus === "Completed"
                              ? "bg-[#E8E8DC] text-[#536044] dark:bg-[#354033] dark:text-[#C4D1B2]"
                              : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                      }`}
                    >
                      {bookingStatus}
                    </span>

                    <div className="text-right">
                      <p className="text-xl font-extrabold text-[#4A291B] dark:text-[#F3E7D8]">
                        ${Number(computedPrice).toFixed(2)}
                      </p>

                      <p className="mt-1 text-xs text-[#8A796B] dark:text-[#C6B4A4]">
                        Total incl. service fee
                      </p>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-[#E5D3C0] bg-[#FFFCF7] py-16 text-center dark:border-[#514034] dark:bg-[#30251F]">
              <CalendarDays
                size={42}
                className="mx-auto text-[#8A796B] dark:text-[#C6B4A4]"
              />

              <h3 className="mt-4 text-lg font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                No Bookings Found
              </h3>

              <p className="mt-2 text-sm text-[#78675B] dark:text-[#C6B4A4]">
                You don&apos;t have any {activeFilter.toLowerCase()} bookings.
              </p>

              <Link href="/studios">
                <Button className="mt-6 rounded-xl bg-[#4A291B] px-6 py-5 text-sm text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#E5D3C0]">
                  Explore Studios
                </Button>
              </Link>
            </div>
          )}
        </section>

        {/* FOOTER / SUPPORT */}
        <section className="flex flex-col gap-3 border-t border-[#E5D3C0] pt-6 dark:border-[#514034] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-base font-bold text-[#4A291B] dark:text-[#F3E7D8]">
              Need help with a booking?
            </h2>

            <p className="mt-1 text-sm text-[#78675B] dark:text-[#C6B4A4]">
              Our creator support team is here for you.
            </p>
          </div>

          <a
            href="mailto:support@studiospace.com"
            className="text-sm font-bold text-[#4A291B] underline dark:text-[#F3E7D8]"
          >
            Contact Support
          </a>
        </section>
      </div>
    </main>
  );
}