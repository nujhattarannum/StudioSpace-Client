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
