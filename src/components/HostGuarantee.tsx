import { ShieldCheck, Users, CheckCircle2, Headphones } from "lucide-react";

export default function HostGuarantee() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="brand-font text-3xl font-bold text-[#4A291B]">
          Host Guarantee & Creator Support
        </h2>
        <p className="mt-1 text-sm text-[#78675B]">
          Safety, verification, and dedicated support for every booking.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Liability Protection", desc: "Book with confidence", icon: ShieldCheck },
          { title: "Verified Profiles", desc: "Trusted hosts & creators", icon: Users },
          { title: "Equipment Safety", desc: "Professional-grade standards", icon: CheckCircle2 },
          { title: "24/7 Support", desc: "We're here to help anytime", icon: Headphones },
        ].map((feature, i) => {
          const Icon = feature.icon;
          return (
            <div
              key={i}
              className="flex items-center gap-4 rounded-2xl border border-[#E5D3C0] bg-[#FFFCF7] p-5 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F3E7D8] text-[#4A291B]">
                <Icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#4A291B]">{feature.title}</h4>
                <p className="text-xs text-[#78675B]">{feature.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}