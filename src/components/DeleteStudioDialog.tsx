import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import React from 'react';
import { toast } from "react-toastify";

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number;
  location: string;
  imageUrl: string;
  ownerEmail?: string;
}

interface IStudioProps{
      selectedStudio: Studio;
}
const DeleteStudioDialog = ({selectedStudio}:IStudioProps) => {
      const router = useRouter();
     const handleDeleteStudio = async () => {

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings/${selectedStudio._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete space.");
      }

      toast.success(`"${selectedStudio.title}" removed successfully!`);
       router.push("/my-listings");

    } catch (error) {
      console.error(error);
      toast.error("Could not delete listing. Please try again.");
    } 
  };
    return (
        <div>
            <AlertDialogTrigger>
    <Button
            type="button"
            variant="outline"
            className="rounded-xl border-[#E5D3C0] text-xs font-bold text-[#4A291B] hover:bg-[#F3E7D8]"
          >
            Delete
          </Button>
  <AlertDialog>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>
      </AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialog>
</AlertDialogTrigger>
        </div>
    );
};

export default DeleteStudioDialog;