import { Building2, CalendarDays, Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#FBF6EE] px-4 py-10 dark:bg-[#211A16] md:px-12">
      <div className="mx-auto max-w-6xl space-y-8 animate-pulse">

        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-[#E5D3C0] pb-6 dark:border-[#514034]">
          <div className="space-y-3">
            <div className="h-3 w-36 rounded bg-[#E5D3C0] dark:bg-[#4A362A]" />
            <div className="h-9 w-64 rounded-lg bg-[#E5D3C0] dark:bg-[#4A362A]" />
            <div className="h-3 w-48 rounded bg-[#E5D3C0] dark:bg-[#4A362A]" />
          </div>

          <div className="hidden h-11 w-40 rounded-xl bg-[#E5D3C0] dark:bg-[#4A362A] sm:block" />
        </div>

        {/* BANNER */}
        <div className="flex items-center justify-between rounded-2xl bg-[#F3E7D8] p-5 dark:bg-[#30251F]">
          <div className="space-y-3">
            <div className="h-4 w-64 rounded bg-[#E5D3C0] dark:bg-[#4A362A]" />
            <div className="h-3 w-80 max-w-full rounded bg-[#E5D3C0] dark:bg-[#4A362A]" />
          </div>

          <CalendarDays className="text-[#B69A83] dark:text-[#C6B4A4]" size={28} />
        </div>

        {/* FILTERS */}
        <div className="flex gap-3">
          <div className="h-9 w-20 rounded-lg bg-[#E5D3C0] dark:bg-[#4A362A]" />
          <div className="h-9 w-24 rounded-lg bg-[#E5D3C0] dark:bg-[#4A362A]" />
          <div className="h-9 w-20 rounded-lg bg-[#E5D3C0] dark:bg-[#4A362A]" />
        </div>

        {/* BOOKING CARD SKELETONS */}
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex flex-col gap-4 rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-3 dark:border-[#514034] dark:bg-[#30251F] md:flex-row"
            >
              <div className="h-44 w-full rounded-xl bg-[#F3E7D8] dark:bg-[#4A362A] md:h-28 md:w-44" />

              <div className="flex-1 space-y-3 py-2">
                <div className="h-3 w-24 rounded bg-[#E5D3C0] dark:bg-[#4A362A]" />
                <div className="h-5 w-48 rounded bg-[#E5D3C0] dark:bg-[#4A362A]" />
                <div className="h-3 w-32 rounded bg-[#E5D3C0] dark:bg-[#4A362A]" />
                <div className="h-3 w-40 rounded bg-[#E5D3C0] dark:bg-[#4A362A]" />

                <div className="flex gap-2 pt-2">
                  <div className="h-8 w-28 rounded-lg bg-[#E5D3C0] dark:bg-[#4A362A]" />
                  <div className="h-8 w-24 rounded-lg bg-[#F3E7D8] dark:bg-[#4A362A]" />
                </div>
              </div>

              <div className="flex items-center justify-between md:w-36 md:flex-col md:items-end md:justify-between">
                <div className="h-6 w-20 rounded-md bg-[#F3E7D8] dark:bg-[#4A362A]" />
                <div className="h-7 w-24 rounded bg-[#E5D3C0] dark:bg-[#4A362A]" />
              </div>
            </div>
          ))}
        </div>

        {/* LOADING MESSAGE */}
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3E7D8] dark:bg-[#30251F]">
            <Building2 className="text-[#4A291B] dark:text-[#F3E7D8]" size={25} />
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold text-[#4A291B] dark:text-[#F3E7D8]">
            <Loader2 size={15} className="animate-spin" />
            Preparing your creative space...
          </div>

          <p className="text-xs text-[#8A796B] dark:text-[#C6B4A4]">
            Good things take a little time.
          </p>
        </div>

      </div>
    </main>
  );
}