export default function HowBookingWorks() {
  return (
    <section className="border-y border-[#E5D3C0] bg-[#FFFCF7] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="brand-font text-3xl font-bold text-[#4A291B]">
            How Booking Works
          </h2>
          <p className="mt-1 text-sm text-[#78675B]">
            Four simple steps to secure your production workspace.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: "1", title: "Discover Spaces", desc: "Browse our curated studios" },
            { step: "2", title: "Select Shoot Hours", desc: "Choose your preferred time" },
            { step: "3", title: "Book Instantly", desc: "Confirm your secure booking" },
            { step: "4", title: "Create & Produce", desc: "Bring your vision to life" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative flex flex-col rounded-2xl border border-[#E5D3C0] bg-[#FBF6EE] p-6 text-center"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#4A291B] font-bold text-white">
                {item.step}
              </div>
              <h3 className="brand-font font-bold text-[#4A291B]">{item.title}</h3>
              <p className="mt-1 text-xs text-[#78675B]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}