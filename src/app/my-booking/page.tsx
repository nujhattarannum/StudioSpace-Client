"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  ArrowUpDown,
  CalendarDays,
  MapPin,
  Loader2,
  XCircle,
  Star,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { getTokenFromClient } from "@/lib/getTokenFromClient";


type BookingFilter = "All" | "Upcoming" | "Past";

export default function MyBookingsPage() {
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const user = session?.user;

  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<BookingFilter>("All");
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedStudioId, setSelectedStudioId] = useState<string | null>(null);
  const [ratingInput, setRatingInput] = useState(5);
  const [commentInput, setCommentInput] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

// Fetch bookings for the logged-in user
  useEffect(() => {
    async function fetchUserBookings() {
      try {
         const token = await getTokenFromClient()
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-booking/${user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          } );

        if (!res.ok) throw new Error("Failed to fetch bookings");
        const result = await res.json();
        setBookings(result);
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
       const token = await getTokenFromClient()
      const res = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/my-booking/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
              Authorization: `Bearer ${token}`,
            },
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

  // Submit Review Handler
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !selectedStudioId) {
      toast.error("Please write a comment.");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const token = await getTokenFromClient();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios/${selectedStudioId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating: ratingInput, comment: commentInput }),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      toast.success("Review submitted successfully!");
      setIsReviewModalOpen(false);
      setCommentInput("");
      setRatingInput(5);
    } catch (error) {
      console.error(error);
      toast.error("Error submitting review.");
    } finally {
      setIsSubmittingReview(false);
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
  const filteredBookings =  activeFilter === "Upcoming"
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

        // Robust price calculation from time slot (e.g., "4PM-8PM" -> 4 hours)
        const getComputedPrice = () => {
          if (booking.totalPrice) return booking.totalPrice;
          if (!booking.Time) return booking.hourlyRate * 3;
          try {
            const parts = booking.Time.toUpperCase().split("-");
            if (parts.length === 2) {
              const parseTimeStr = (str: string) => {
                str = str.trim();
                let hours = parseInt(str);
                if (str.includes("PM") && hours < 12) hours += 12;
                if (str.includes("AM") && hours === 12) hours = 0;
                return hours;
              };
              const start = parseTimeStr(parts[0]);
              const end = parseTimeStr(parts[1]);
              let diff = end - start;
              if (diff <= 0) diff += 24;
              return booking.hourlyRate * diff;
            }
          } catch (e) {
            console.error("Error parsing time slot:", e);
          }
          return booking.hourlyRate * 3;
        };

        const computedPrice = getComputedPrice();

        return (
          <article
            key={booking._id}
            className="flex flex-col gap-5 rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-4 shadow-sm transition hover:shadow-md dark:border-[#6C5342] dark:bg-[#4A362A] md:flex-row md:items-center"
          >
            {/* STUDIO IMAGE */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                booking.studioImage ||
                "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04"
              }
              alt={booking.studioTitle}
              className="h-52 w-full rounded-xl object-cover border border-[#E5D3C0] dark:border-[#6C5342] md:h-36 md:w-48"
            />

            {/* BOOKING DETAILS */}
            <div className="min-w-0 flex-1 space-y-3">
              <div>
                <p className="text-sm font-medium text-[#8A796B] dark:text-[#D4C3B3]">
                  {booking.category || "Studio Workspace"}
                </p>

                <h2 className="mt-1 text-2xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                  {booking.studioTitle}
                </h2>

                <p className="mt-1 flex items-center gap-2 text-sm text-[#78675B] dark:text-[#D4C3B3]">
                  <MapPin size={15} />
                  {booking.location}
                </p>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[#78675B] dark:text-[#F3E7D8]">
                <p className="font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                  {formatDate(booking.bookedDate)}
                </p>

                <p>{booking.Time}</p>
              </div>

              <p className="text-sm text-[#8A796B] dark:text-[#D4C3B3]">
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

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedStudioId(booking.studioId);
                    setIsReviewModalOpen(true);
                  }}
                  className="h-10 rounded-lg border-[#4A291B] px-5 text-sm font-bold text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#BDAA99] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
                >
                  <Star size={15} className="mr-2 fill-[#4A291B] dark:fill-[#F3E7D8]" />
                  Leave Review
                </Button>

                {bookingStatus === "Pending" && (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={cancellingId === booking._id}
                    onClick={() => handleCancelBooking(booking._id)}
                    className="h-10 rounded-lg border-red-300 px-5 text-sm font-bold text-red-700 hover:bg-red-50 dark:border-red-700 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-900/60"
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
            <div className="flex flex-row items-center justify-between gap-4 border-t border-[#E5D3C0] pt-4 dark:border-[#6C5342] md:min-w-40 md:flex-col md:items-end md:justify-between md:self-stretch md:border-t-0 md:pt-0">
              <span
                className={`rounded-md px-4 py-2 text-xs font-bold ${
                  bookingStatus === "Confirmed"
                    ? "bg-[#E1EEDC] text-[#365B32] dark:bg-[#354033] dark:text-[#C4D1B2] dark:border dark:border-[#52684D]"
                    : bookingStatus === "Pending"
                      ? "bg-[#F7EBD5] text-[#8A622B] dark:bg-[#5A4535] dark:text-[#FFD188] dark:border dark:border-[#8A6D53]"
                      : bookingStatus === "Completed"
                        ? "bg-[#E8E8DC] text-[#536044] dark:bg-[#354033] dark:text-[#C4D1B2] dark:border dark:border-[#52684D]"
                        : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 dark:border dark:border-red-800"
                }`}
              >
                {bookingStatus}
              </span>

              <div className="text-right">
                <p className="text-xl font-extrabold text-[#4A291B] dark:text-[#F3E7D8]">
                  ${Number(computedPrice).toFixed(2)}
                </p>

                <p className="mt-1 text-xs text-[#8A796B] dark:text-[#D4C3B3]">
                  Total incl. service fee
                </p>
              </div>
            </div>
          </article>
        );
      })
    ) : (
      <div className="rounded-2xl border border-dashed border-[#E5D3C0] bg-[#FFFCF7] py-16 text-center dark:border-[#6C5342] dark:bg-[#30251F]">
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

        {/* REVIEW MODAL */}
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] p-6 shadow-xl dark:border-[#514034] dark:bg-[#4A362A]">
              <div className="flex items-center justify-between">
                <h3 className="brand-font text-xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                  Rate & Review Studio
                </h3>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="text-xs font-bold text-[#78675B] hover:text-[#4A291B] dark:text-[#C6B4A4]"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleReviewSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#78675B] dark:text-[#C6B4A4]">
                    Rating (1 to 5 Stars)
                  </label>
                  <select
                    value={ratingInput}
                    onChange={(e) => setRatingInput(Number(e.target.value))}
                    className="mt-1 w-full rounded-xl border border-[#E5D3C0] bg-transparent p-2.5 text-xs font-bold text-[#4A291B] dark:border-[#514034] dark:text-[#F3E7D8]"
                  >
                    <option value={5}>5 - ★★★★★ (Exceptional)</option>
                    <option value={4}>4 - ★★★★☆ (Great)</option>
                    <option value={3}>3 - ★★★☆☆ (Good)</option>
                    <option value={2}>2 - ★★☆☆☆ (Fair)</option>
                    <option value={1}>1 - ★☆☆☆☆ (Poor)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#78675B] dark:text-[#C6B4A4]">
                    Your Review
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Share your experience working in this studio..."
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-[#E5D3C0] bg-transparent p-3 text-xs text-[#4A291B] focus:outline-none dark:border-[#514034] dark:text-[#F3E7D8]"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="rounded-xl border-[#E5D3C0] text-xs font-bold text-[#4A291B] dark:border-[#514034] dark:text-[#F3E7D8]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="rounded-xl bg-[#4A291B] px-5 py-2 text-xs font-bold text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E]"
                  >
                    {isSubmittingReview ? "Submitting..." : "Post Review"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

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