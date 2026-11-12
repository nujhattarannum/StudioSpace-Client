"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { 
  Building2, 
  Pencil, 
  Plus, 
  MapPin, 
  Loader2,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Users
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import DeleteStudioDialog from "@/components/DeleteStudioDialog";
import { Studio } from "@/types/studio";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

export default function MyListingsPage() {
  const { data: session, isPending: isAuthPending } = authClient.useSession();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchMyListings = async (userEmail: string) => {
      try {
        const token = await getTokenFromClient();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings/${userEmail}`, {
          headers: {
            authorization: `Bearer ${token}`
          },
        });
        if (!res.ok) throw new Error("Failed to fetch listings");

        const listedStudios: Studio[] = await res.json();
        setStudios(listedStudios);

        const bookingRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/owner-bookings/${userEmail}`, {
          headers: {
            authorization: `Bearer ${token}`
          },
        });
        
        if (bookingRes.ok) {
          const bookingData: Booking[] = await bookingRes.json();
          setBookings(bookingData);
        }
      } catch (error) {
        console.error("Error loading user listings:", error);
        toast.error("Failed to load your listings.");
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthPending && session?.user?.email) {
      fetchMyListings(session.user.email);
    }
  }, [session, isAuthPending]);

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: "Confirmed" | "Cancelled") => {
    try {
      const token = await getTokenFromClient();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}/status`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error(`Failed to update booking to ${newStatus}`);

      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b))
      );

      toast.success(`Booking successfully ${newStatus.toLowerCase()}!`);
    } catch (error) {
      console.error(error);
      toast.error("Could not update status. Try again.");
    }
  };

  if (isAuthPending || isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FBF6EE] dark:bg-[#211A16]">
        <div className="flex flex-col items-center gap-3 text-[#78675B] dark:text-[#C6B4A4]">
          <Loader2 size={40} className="animate-spin text-[#4A291B] dark:text-[#F3E7D8]" />
          <p className="font-semibold text-sm">Loading your studio listings...</p>
        </div>
      </main>
    );
  }

return (
    <main className="min-h-screen bg-[#FBF6EE] px-4 py-10 dark:bg-[#211A16] md:px-12">
      <div className="mx-auto max-w-6xl space-y-12">

        {/* SECTION 1: MY STUDIO LISTINGS */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E5D3C0] pb-6 dark:border-[#514034]">
            <div>
              <h1 className="brand-font text-2xl sm:text-3xl font-extrabold text-[#4A291B] dark:text-[#F3E7D8]">
                My Studio Listings
              </h1>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-[#78675B] dark:text-[#C6B4A4]">
                Manage, update, or remove your registered creative workspaces
              </p>
            </div>
            <Link href="/add-studio">
              <Button className="flex items-center gap-2 rounded-xl bg-[#4A291B] font-bold text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#E5D3C0]">
                <Plus size={16} /> Add New Studio
              </Button>
            </Link>
          </div>

          {studios.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#E5D3C0] bg-[#FFFCF7] p-10 text-center dark:border-[#514034] dark:bg-[#30251F]">
              <Building2 size={40} className="text-[#8A796B] dark:text-[#C6B4A4]" />
              <h3 className="mt-3 text-base font-bold text-[#4A291B] dark:text-[#F3E7D8]">No Listings Found</h3>
              <p className="mt-1 text-xs text-[#78675B] dark:text-[#C6B4A4]">You haven&apos;t added any studios yet.</p>
            </div>
          ) : (
            <>
              {/* MOBILE & TABLET CARD VIEW (< md) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                {studios.map((studio) => (
                  <div key={studio._id} className="flex flex-col justify-between rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] p-5 shadow-sm dark:border-[#514034] dark:bg-[#30251F]">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img src={studio.imageUrl || "/placeholder.jpg"} alt={studio.title} className="h-16 w-20 rounded-xl object-cover border border-[#E5D3C0] dark:border-[#514034]" />
                        <div>
                          <span className="inline-block rounded-full bg-[#F3E7D8] px-2.5 py-0.5 text-[10px] font-bold text-[#4A291B] dark:bg-[#4A362A] dark:text-[#F3E7D8]">
                            {studio.category}
                          </span>
                          <h3 className="font-bold text-xs sm:text-sm text-[#4A291B] dark:text-[#F3E7D8] mt-1">{studio.title}</h3>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#78675B] dark:text-[#C6B4A4]">
                        <div className="flex items-center gap-1 font-semibold">
                          <MapPin size={14} className="text-[#8A796B] dark:text-[#C6B4A4]" /> {studio.location}
                        </div>
                        <span className="font-extrabold text-[#4A291B] dark:text-[#F3E7D8] text-xs sm:text-sm">${studio.hourlyRate}/hr</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 border-t border-[#E5D3C0] dark:border-[#514034] pt-4 mt-4">
                      <Link href={`/studios/edit/${studio._id}`}>
                        <Button variant="outline" size="sm" className="h-8 sm:h-9 rounded-xl border-[#E5D3C0] bg-[#FFFCF7] text-[11px] sm:text-xs font-bold text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#665247] dark:bg-[#30251F] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]">
                          <Pencil size={14} className="mr-1" /> Update
                        </Button>
                      </Link>
                      <DeleteStudioDialog selectedStudio={studio} />
                    </div>
                  </div>
                ))}
              </div>

              {/* DESKTOP TABLE VIEW (md and up) */}
              <div className="hidden md:block overflow-x-auto rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] shadow-sm dark:border-[#514034] dark:bg-[#30251F]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5D3C0] bg-[#F3E7D8]/50 text-sm font-bold text-[#4A291B] dark:border-[#514034] dark:bg-[#4A362A] dark:text-[#F3E7D8]">
                      <th className="py-4 px-6">Studio</th>
                      <th className="py-4 px-4">Category</th>
                      <th className="py-4 px-4">Location</th>
                      <th className="py-4 px-4">Hourly Rate</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5D3C0] dark:divide-[#514034]">
                    {studios.map((studio) => (
                      <tr key={studio._id} className="hover:bg-[#FBF6EE]/65 transition-colors dark:hover:bg-[#4A362A]/50">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img src={studio.imageUrl || "/placeholder.jpg"} alt={studio.title} className="h-12 w-16 rounded-lg object-cover border border-[#E5D3C0] dark:border-[#514034]" />
                            <span className="font-bold text-sm text-[#4A291B] dark:text-[#F3E7D8]">{studio.title}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm font-semibold text-[#78675B] dark:text-[#C6B4A4]">
                          <span className="inline-block rounded-full bg-[#F3E7D8] px-3 py-1 font-bold text-[#4A291B] dark:bg-[#4A362A] dark:text-[#F3E7D8]">{studio.category}</span>
                        </td>
                        <td className="py-4 px-4 text-sm text-[#78675B] dark:text-[#C6B4A4]">
                          <div className="flex items-center gap-1 font-semibold">
                            <MapPin size={14} className="text-[#8A796B] dark:text-[#C6B4A4]" /> {studio.location}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm font-extrabold text-[#4A291B] dark:text-[#F3E7D8]">${studio.hourlyRate}/hr</td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link href={`/studios/edit/${studio._id}`}>
                              <Button variant="outline" size="sm" className="h-9 rounded-xl border-[#E5D3C0] bg-[#FFFCF7] text-sm font-bold text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#665247] dark:bg-[#30251F] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]">
                                <Pencil size={14} className="mr-1" /> Update
                              </Button>
                            </Link>
                            <DeleteStudioDialog selectedStudio={studio} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* SECTION 2: INCOMING BOOKING REQUESTS */}
        <div className="space-y-6 pt-6">
          <div className="border-b border-[#E5D3C0] pb-6 dark:border-[#514034]">
            <h2 className="brand-font text-2xl sm:text-3xl font-extrabold text-[#4A291B] dark:text-[#F3E7D8]">
              Incoming Booking Requests
            </h2>
            <p className="mt-1 text-xs sm:text-sm font-semibold text-[#78675B] dark:text-[#C6B4A4]">
              Review and confirm reservations made by creators for your studios.
            </p>
          </div>

          {bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#E5D3C0] bg-[#FFFCF7] p-10 text-center dark:border-[#514034] dark:bg-[#30251F]">
              <Calendar size={40} className="text-[#8A796B] dark:text-[#C6B4A4]" />
              <h3 className="mt-3 text-base font-bold text-[#4A291B] dark:text-[#F3E7D8]">No Booking Requests</h3>
              <p className="mt-1 text-xs text-[#78675B] dark:text-[#C6B4A4]">No one has booked your listings yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => {
                // Robust price calculation function for incoming bookings
                const getComputedPrice = () => {
                  if (booking.totalPrice && booking.totalPrice > 0) return booking.totalPrice;
                  
                  // If hourlyRate and Time are available, calculate dynamically
                  if (booking.hourlyRate && booking.Time) {
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
                      console.error("Error parsing booking time:", e);
                    }
                  }
                  return 0;
                };

                const computedTotal = getComputedPrice();

                return (
                  <div key={booking._id} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] p-4 sm:p-6 shadow-sm dark:border-[#514034] dark:bg-[#30251F]">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {booking.studioImage && (
                        <img src={booking.studioImage} alt={booking.studioTitle} className="h-16 w-20 rounded-xl object-cover border border-[#E5D3C0] dark:border-[#514034]" />
                      )}
                      <div className="space-y-1">
                        <span className="inline-block rounded-full bg-[#F3E7D8] px-2.5 py-0.5 text-[10px] sm:text-[12px] font-bold text-[#4A291B] dark:bg-[#4A362A] dark:text-[#F3E7D8]">
                          Status: {booking.status || "Pending"}
                        </span>
                        <h3 className="font-bold text-sm sm:text-base text-[#4A291B] dark:text-[#F3E7D8]">{booking.studioTitle}</h3>
                        <p className="text-xs sm:text-sm text-[#78675B] dark:text-[#C6B4A4]">
                          Guest Email: <span className="text-xs sm:text-sm font-semibold">{booking.email}</span>
                        </p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-[#78675B] dark:text-[#C6B4A4] pt-1">
                          <span className="flex items-center gap-1"><Calendar size={13} /> {booking.bookedDate}</span>
                          <span className="flex items-center gap-1"><Clock size={13} /> {booking.Time}</span>
                          <span className="flex items-center gap-1"><Users size={13} /> {booking.guest} guest(s)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-[#E5D3C0] dark:border-[#514034]">
                      <div className="text-right">
                        <span className="text-xs sm:text-sm font-semibold text-[#78675B] dark:text-[#C6B4A4] block">Total</span>
                        {/* Use computedTotal instead of booking.totalPrice directly */}
                        <span className="font-extrabold text-sm sm:text-md text-[#4A291B] dark:text-[#F3E7D8]">
                          ${Number(computedTotal).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {(!booking.status || booking.status === "Pending") ? (
                          <>
                            <Button size="sm" onClick={() => handleUpdateBookingStatus(booking._id, "Confirmed")} className="rounded-xl bg-green-700 font-bold text-white hover:bg-green-800 text-xs sm:text-sm">
                              <CheckCircle2 size={16} className="mr-1" /> Confirm
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleUpdateBookingStatus(booking._id, "Cancelled")} className="rounded-xl border-red-300 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/40 text-xs sm:text-sm">
                              <XCircle size={16} className="mr-1" /> Reject
                            </Button>
                          </>
                        ) : (
                          <span className={`text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl ${
                            booking.status === "Confirmed" ? "bg-green-100 text-green-800 dark:bg-green-950/60 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"
                          }`}>
                            {booking.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}