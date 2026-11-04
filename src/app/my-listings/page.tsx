"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { 
  Building2, 
  Pencil, 
  Trash2, 
  Plus, 
  MapPin, 
  Loader2 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import DeleteStudioDialog from "@/components/DeleteStudioDialog";
import { Studio } from "@/types/studio";

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session, isPending: isAuthPending } = authClient.useSession();

  const [studios, setStudios] = useState<Studio[]>([]);
  const [isLoading, setIsLoading] = useState(true);



useEffect(() => {
  // Fetch listings function placed BEFORE useEffect
  const fetchMyListings = async (userEmail: string) => {
    try {

      const res = await fetch("http://localhost:8000/studios");
      if (!res.ok) throw new Error("Failed to fetch studios");

      const data: Studio[] = await res.json();

      const userOwnedStudios = data.filter(
        (studio) => studio.ownerEmail?.toLowerCase() === userEmail.toLowerCase()
      );

      setStudios(userOwnedStudios);
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
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Header Section */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#E5D3C0] pb-6 dark:border-[#514034]">
          <div>
            <h1 className="brand-font text-3xl font-extrabold text-[#4A291B] dark:text-[#F3E7D8]">
              My Studio Listings
            </h1>
            <p className="mt-1 text-xs font-semibold text-[#78675B] dark:text-[#C6B4A4]">
              Manage, update, or remove your registered creative workspaces
            </p>
          </div>

          <Link href="/add-studio">
            <Button className="flex items-center gap-2 rounded-xl bg-[#4A291B] font-bold text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#E5D3C0]">
              <Plus size={16} /> Add New Studio
            </Button>
          </Link>
        </div>

        {/* Empty State */}
        {studios.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#E5D3C0] bg-[#FFFCF7] p-12 text-center dark:border-[#514034] dark:bg-[#30251F]">
            <Building2 size={48} className="text-[#8A796B] dark:text-[#C6B4A4]" />
            <h3 className="mt-4 text-lg font-bold text-[#4A291B] dark:text-[#F3E7D8]">No Listings Found</h3>
            <p className="mt-1 text-xs text-[#78675B] dark:text-[#C6B4A4]">
              You haven&apos;t added any studios yet. Start listing your workspace today!
            </p>
            <Link href="/add-studio" className="mt-6">
              <Button className="rounded-xl bg-[#4A291B] font-bold text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#E5D3C0]">
                Add Your First Studio
              </Button>
            </Link>
          </div>
        ) : (
          /* Table View */
          <div className="overflow-x-auto rounded-3xl border border-[#E5D3C0] bg-[#FFFCF7] shadow-sm dark:border-[#514034] dark:bg-[#30251F]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5D3C0] bg-[#F3E7D8]/50 text-xs font-bold text-[#4A291B] dark:border-[#514034] dark:bg-[#4A362A] dark:text-[#F3E7D8]">
                  <th className="py-4 px-6">Studio</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Location</th>
                  <th className="py-4 px-4">Hourly Rate</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5D3C0] dark:divide-[#514034]">
                {studios.map((studio) => (
                  <tr key={studio._id} className="hover:bg-[#FBF6EE]/60 transition-colors dark:hover:bg-[#4A362A]/50">

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={studio.imageUrl || "/placeholder.jpg"}
                          alt={studio.title}
                          className="h-12 w-16 rounded-lg object-cover border border-[#E5D3C0] dark:border-[#514034]"
                        />
                        <span className="font-bold text-sm text-[#4A291B] dark:text-[#F3E7D8]">
                          {studio.title}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs font-semibold text-[#78675B] dark:text-[#C6B4A4]">
                      <span className="inline-block rounded-full bg-[#F3E7D8] px-3 py-1 font-bold text-[#4A291B] dark:bg-[#4A362A] dark:text-[#F3E7D8]">
                        {studio.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-xs text-[#78675B] dark:text-[#C6B4A4]">
                      <div className="flex items-center gap-1 font-semibold">
                        <MapPin size={14} className="text-[#8A796B] dark:text-[#C6B4A4]" />
                        {studio.location}
                      </div>
                    </td>

                    <td className="py-4 px-4 text-xs font-extrabold text-[#4A291B] dark:text-[#F3E7D8]">
                      ${studio.hourlyRate}/hr
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">

                        {/* UPDATE BUTTON: Navigates to dedicated update page */}
                        <Link href={`/studios/edit/${studio._id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-9 rounded-xl border-[#E5D3C0] bg-[#FFFCF7] text-xs font-bold text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#665247] dark:bg-[#30251F] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
                          >
                            <Pencil size={14} className="mr-1" /> Update
                          </Button>
                        </Link>

                        {/* DELETE BUTTON: Opens Delete Component Modal */}
                     <DeleteStudioDialog selectedStudio={studio}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </main>
  );
}