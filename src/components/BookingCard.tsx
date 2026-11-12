'use client'
import React, { useState } from 'react';
import { Studio } from '@/types/studio';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
   Check,  ShieldCheck
} from "lucide-react";
import { getTokenFromClient } from '@/lib/getTokenFromClient';

interface StudioProps {
    studio: Studio;
}
const BookingCard = ({studio}:StudioProps) => {
  console.log(studio);
      const {data:session} = authClient.useSession()
    
      const user = session?.user;
    
    // Booking Form States
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [guestsCount, setGuestsCount] = useState(1);
    const [isBooking, setIsBooking] = useState(false);
  
     const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingDate || !bookingTime) {
      toast.error("Please select a date and time for your booking.");
      return;
    }

    // Optional: Ensure user is logged in before booking
    if (!user) {
      toast.error("Please log in to book a studio workspace.");
      return;
    }

    setIsBooking(true);

    try {
      const bookingData = {
        studioId: studio?._id,
        studioTitle: studio?.title,
        studioImage: studio?.imageUrl,
        location: studio?.location,
        hourlyRate: studio?.hourlyRate,
        username: user?.name,
        email: user?.email,
        image: user?.image,
        status:"Pending",
        bookedDate: bookingDate,
        Time: bookingTime,
        guest: guestsCount,
      };
      console.log("📤 Sending Booking Data to Backend:", bookingData);
      const token = await getTokenFromClient()
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Fixed header syntax
          authorization : `Bearer ${token}`
        },
        body: JSON.stringify(bookingData),
      });

      if (!res.ok) {
        throw new Error("Failed to save booking to database");
      }

      const result = await res.json();
      console.log("Booking saved:", result);

      toast.success("Workspace booking request submitted successfully!");
      
      // Optional: Clear form or redirect
      // router.push("/my-bookings");
      
    } catch (err) {
      console.error(err);
      toast.error("Failed to book workspace. Please try again.");
    } finally {
      setIsBooking(false);
    }};

   return (
      <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              {/* Booking Card */}
              <div className="rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] p-6 shadow-sm dark:border-[#514034] dark:bg-[#4A362A]">
                <div className="flex items-baseline justify-between border-b border-[#E5D3C0] pb-5 dark:border-[#514034]">
                  <div>
                    <span className="brand-font text-3xl font-extrabold text-[#4A291B] dark:text-[#F3E7D8]">
                      ${studio.hourlyRate}
                    </span>
                    <span className="text-xs font-medium text-[#78675B] dark:text-[#C6B4A4]"> / hour</span>
                  </div>
                </div>

                <form onSubmit={handleBooking} className="mt-6 space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                      Plan your next session
                    </label>
                    <div className="rounded-xl border border-[#E5D3C0] bg-[#FBF6EE] p-3 dark:border-[#514034] dark:bg-[#30251F]">
                      <span className="block text-[10px] font-bold text-[#8A796B] dark:text-[#C6B4A4]">
                        DATE
                      </span>
                      <Input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="h-7 border-none bg-transparent p-0 text-xs font-semibold text-[#4A291B] focus-visible:ring-0 dark:text-[#F3E7D8]"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#E5D3C0] bg-[#FBF6EE] p-3 dark:border-[#514034] dark:bg-[#30251F]">
                    <span className="block text-[10px] font-bold text-[#8A796B] dark:text-[#C6B4A4]">
                      TIME SLOT
                    </span>
                    <Input
                      type="text"
                      placeholder="Start time — End time (e.g. 10 AM - 2 PM)"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="h-7 border-none bg-transparent p-0 text-xs font-semibold text-[#4A291B] focus-visible:ring-0 placeholder:text-[#8A796B]/60 dark:text-[#F3E7D8] dark:placeholder:text-[#C6B4A4]/60"
                    />
                  </div>

                  <div className="rounded-xl border border-[#E5D3C0] bg-[#FBF6EE] p-3 dark:border-[#514034] dark:bg-[#30251F]">
                    <span className="block text-[10px] font-bold text-[#8A796B] dark:text-[#C6B4A4]">
                      GUESTS
                    </span>
                    <select
                      value={guestsCount}
                      onChange={(e) => setGuestsCount(Number(e.target.value))}
                      className="w-full border-none bg-transparent text-xs font-semibold text-[#4A291B] outline-none dark:text-[#F3E7D8] dark:bg-[#30251F]"
                    >
                      {[1, 2, 4, 6, 8, 10, 15, 20].map((num) => (
                        <option key={num} value={num} className="dark:bg-[#30251F] dark:text-[#F3E7D8]">
                          {num} {num === 1 ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isBooking}
                    className="mt-2 h-12 w-full rounded-xl bg-[#4A291B] font-bold text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#E5D3C0]"
                  >
                    {isBooking ? "Processing..." : "Book Workspace Now"}
                  </Button>

                  <p className="text-center text-[11px] text-[#78675B] dark:text-[#C6B4A4]">
                    You won&apos;t be charged yet
                  </p>

                  <div className="mt-4 flex items-center justify-center gap-4 border-t border-[#E5D3C0] pt-4 text-[11px] font-bold text-[#4A291B] dark:border-[#514034] dark:text-[#F3E7D8]">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={14} /> Secure payments
                    </span>
                    <span className="flex items-center gap-1">
                      <Check size={14} /> Verified space
                    </span>
                  </div>
              </form>
            </div>

            {/* Confidence Assurance Banner */}
            <div className="rounded-3xl border border-[#E5D3C0] bg-[#F3E7D8]/60 p-6 dark:border-[#514034] dark:bg-[#4A362A]/60">
              <h4 className="brand-font text-lg font-bold text-[#4A291B] dark:text-[#F3E7D8]">
                Create with confidence
            </h4>
            <ul className="mt-3 space-y-2 text-xs font-medium text-[#78675B] dark:text-[#C6B4A4]">
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#4A291B] dark:text-[#F3E7D8]" />
                  Verified workspace and host
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#4A291B] dark:text-[#F3E7D8]" />
                  Equipment safety standards
                </li>
                <li className="flex items-center gap-2">
                  <Check size={14} className="text-[#4A291B] dark:text-[#F3E7D8]" />
                  Creator support, every step of the way
                </li>
            </ul>
          </div>
        </div>
      </div>
  );
};

export default BookingCard;