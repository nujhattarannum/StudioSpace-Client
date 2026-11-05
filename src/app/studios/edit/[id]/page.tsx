
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Loader2, ArrowLeft, Save, Camera } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Studio } from "@/types/studio";

export default function UpdateStudioPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: session, isPending: isAuthPending } =
    authClient.useSession();

  const [studio, setStudio] = useState<Studio | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "",
    capacity: "",
    location: "",
    imageUrl: "",
    amenities: "",
    description: "",
  });

  // Fetch existing studio information
  useEffect(() => {
    if (isAuthPending) return;

    if (!session?.user?.email) {
      router.replace("/login");
      return;
    }

    const fetchStudio = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`);

        if (!res.ok) {
          throw new Error("Failed to fetch studios");
        }

        const data: Studio[] = await res.json();

        const selectedStudio = data.find(
          (item) => String(item._id) === id
        );

        if (!selectedStudio) {
          toast.error("Studio not found.");
          router.replace("/my-listings");
          return;
        }

        // Check whether the logged-in user owns this studio
        if (
          selectedStudio.ownerEmail?.toLowerCase() !==
          session.user.email.toLowerCase()
        ) {
          toast.error("You are not authorized to update this studio.");
          router.replace("/my-listings");
          return;
        }

        setStudio(selectedStudio);

        // Pre-fill the form
        setFormData({
          title: selectedStudio.title || "",
          category: selectedStudio.category || "",
          hourlyRate: String(selectedStudio.hourlyRate ?? ""),
          securityDeposit: String(selectedStudio.securityDeposit ?? ""),
          capacity: String(selectedStudio.capacity ?? ""),
          location: selectedStudio.location || "",
          imageUrl: selectedStudio.imageUrl || "",
          amenities: selectedStudio.amenities?.join(", ") || "",
          description: selectedStudio.description || "",
        });
      } catch (error) {
        console.error("Error loading studio:", error);
        toast.error("Failed to load studio details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudio();
  }, [id, session, isAuthPending, router]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated studio information
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studio) return;

    try {
      setIsSubmitting(true);

      const updatedStudio = {
        title: formData.title,
        category: formData.category,
        hourlyRate: Number(formData.hourlyRate),
        securityDeposit: Number(formData.securityDeposit),
        capacity: Number(formData.capacity),
        location: formData.location,
        imageUrl: formData.imageUrl,
        amenities: formData.amenities
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
        description: formData.description,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudio),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to update studio");
      }

      toast.success("Studio updated successfully!");

      router.push("/my-listings");
      router.refresh();
    } catch (error) {
      console.error("Error updating studio:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isAuthPending || isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FBF6EE] dark:bg-[#211A16]">
        <div className="flex flex-col items-center gap-3 text-[#78675B] dark:text-[#C6B4A4]">
          <Loader2
            size={40}
            className="animate-spin text-[#4A291B] dark:text-[#F3E7D8]"
          />
          <p className="text-sm font-semibold">
            Loading studio details...
          </p>
        </div>
      </main>
    );
  }

  if (!studio) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#FBF6EE] px-4 py-10 dark:bg-[#211A16] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/my-listings"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#78675B] hover:text-[#4A291B] dark:text-[#C6B4A4] dark:hover:text-[#F3E7D8]"
          >
            <ArrowLeft size={17} />
            Back to My Listings
          </Link>

          <h1 className="brand-font text-3xl font-extrabold text-[#4A291B] dark:text-[#F3E7D8]">
            Update Your Studio
          </h1>

          <p className="mt-2 text-sm text-[#78675B] dark:text-[#C6B4A4]">
            Edit your studio information and keep your listing up to date.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* Host Information - Read Only */}
          <div className="rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-6 dark:border-[#514034] dark:bg-[#30251F]">
            <h2 className="mb-5 text-xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
              Host Information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                  Host Name
                </label>

                <Input
                  value={studio.ownerName || ""}
                  readOnly
                  className="h-12 border-[#E5D3C0] bg-[#F3E7D8]/50 text-[#78675B] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#C6B4A4]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                  Host Email
                </label>

                <Input
                  value={studio.ownerEmail || ""}
                  readOnly
                  className="h-12 border-[#E5D3C0] bg-[#F3E7D8]/50 text-[#78675B] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#C6B4A4]"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-[#8A796B] dark:text-[#C6B4A4]">
              Host information cannot be changed from this page.
            </p>
          </div>

          {/* Studio Details */}
          <div className="space-y-5 rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-6 dark:border-[#514034] dark:bg-[#30251F]">

            <h2 className="text-xl font-bold text-[#4A291B] dark:text-[#F3E7D8]">
              Studio Details
            </h2>

            {/* Studio Title */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                Studio Name
              </label>

              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter studio name"
                className="h-12 border-[#E5D3C0] bg-[#FBF6EE] text-[#2C221E] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#F3E7D8] dark:placeholder:text-[#BDAA99]"
              />
            </div>

            {/* Category and Capacity */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                  Category
                </label>

                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Photo Studio"
                  className="h-12 border-[#E5D3C0] bg-[#FBF6EE] text-[#2C221E] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#F3E7D8] dark:placeholder:text-[#BDAA99]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                  Capacity
                </label>

                <Input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                  min="1"
                  placeholder="Maximum people"
                  className="h-12 border-[#E5D3C0] bg-[#FBF6EE] text-[#2C221E] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#F3E7D8] dark:placeholder:text-[#BDAA99]"
                />
              </div>

            </div>

            {/* Pricing */}
            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                  Hourly Rate ($)
                </label>

                <Input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="e.g. 50"
                  className="h-12 border-[#E5D3C0] bg-[#FBF6EE] text-[#2C221E] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#F3E7D8] dark:placeholder:text-[#BDAA99]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                  Security Deposit ($)
                </label>

                <Input
                  type="number"
                  name="securityDeposit"
                  value={formData.securityDeposit}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder="e.g. 100"
                  className="h-12 border-[#E5D3C0] bg-[#FBF6EE] text-[#2C221E] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#F3E7D8] dark:placeholder:text-[#BDAA99]"
                />
              </div>

            </div>

            {/* Location */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                Location
              </label>

              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Enter studio location"
                className="h-12 border-[#E5D3C0] bg-[#FBF6EE] text-[#2C221E] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#F3E7D8] dark:placeholder:text-[#BDAA99]"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                Studio Image URL
              </label>

              <Input
                name="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={handleChange}
                required
                placeholder="https://example.com/studio-image.jpg"
                className="h-12 border-[#E5D3C0] bg-[#FBF6EE] text-[#2C221E] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#F3E7D8] dark:placeholder:text-[#BDAA99]"
              />

              {formData.imageUrl && (
                <div className="mt-4 overflow-hidden rounded-xl border border-[#E5D3C0] dark:border-[#514034]">
                  <img
                    src={formData.imageUrl}
                    alt="Studio preview"
                    className="h-56 w-full object-cover"
                  />
                </div>
              )}
            </div>

            {/* Amenities */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                Amenities
              </label>

              <Input
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                placeholder="WiFi, Lighting, Parking, Air Conditioning"
                className="h-12 border-[#E5D3C0] bg-[#FBF6EE] text-[#2C221E] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#F3E7D8] dark:placeholder:text-[#BDAA99]"
              />

              <p className="mt-2 text-xs text-[#8A796B] dark:text-[#C6B4A4]">
                Separate each amenity with a comma.
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
                Studio Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Describe your studio and its facilities..."
                className="w-full rounded-xl border border-[#E5D3C0] bg-[#FBF6EE] p-3 text-sm text-[#2C221E] outline-none focus:ring-2 focus:ring-[#8A796B] dark:border-[#514034] dark:bg-[#211A16] dark:text-[#F3E7D8] dark:placeholder:text-[#BDAA99] dark:focus:ring-[#BDAA99]"
              />
            </div>

          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/my-listings")}
              className="h-12 rounded-xl border-[#E5D3C0] bg-[#FFFCF7] px-7 font-bold text-[#4A291B] hover:bg-[#F3E7D8] dark:border-[#665247] dark:bg-[#30251F] dark:text-[#F3E7D8] dark:hover:bg-[#4A362A]"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 rounded-xl bg-[#4A291B] px-7 font-bold text-white hover:bg-[#2C221E] dark:bg-[#F3E7D8] dark:text-[#2C221E] dark:hover:bg-[#E5D3C0]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={17} className="mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={17} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>

          </div>

        </form>
      </div>
    </main>
  );
}
