"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageUrl: string;
  ownerEmail?: string;
}

interface IStudioProps {
  selectedStudio: Studio;
}

const DeleteStudioDialog = ({ selectedStudio }: IStudioProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteStudio = async () => {
    // Standard browser confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete "${selectedStudio.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsDeleting(true);

    const token = await  getTokenFromClient()
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings/${selectedStudio._id}`,
        {
          method: "DELETE",
          headers:{
            authorization : `Bearer ${token}`
          }       
        }  );

      if (!res.ok) {
        throw new Error("Failed to delete space.");
      }

      toast.success(`"${selectedStudio.title}" removed successfully!`);
      router.refresh(); // Refreshes the listings page data
    } catch (error) {
      console.error(error);
      toast.error("Could not delete listing. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      disabled={isDeleting}
      onClick={handleDeleteStudio}
      className="rounded-xl border-[#E5D3C0] text-xs font-bold text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#665247] dark:bg-[#30251F] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
    >
      {isDeleting ? (
        <>
          <Loader2 size={14} className="mr-1 animate-spin" /> Deleting...
        </>
      ) : (
        "Delete"
      )}
    </Button>
  );
};

export default DeleteStudioDialog;