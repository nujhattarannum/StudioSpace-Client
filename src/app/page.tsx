import Banner from "@/components/banner";
import BrowseCategories from "@/components/BrowseCategories";
import FeaturedStudios from "@/components/FeaturedStudios";
import HostGuarantee from "@/components/HostGuarantee";
import HowBookingWorks from "@/components/HowBookingWorks";

export default function Home() {
  return (
    <>
   
      <main className="pb-10">
        <Banner />
        <BrowseCategories/>
        <FeaturedStudios/>
        <HowBookingWorks/>
        <HostGuarantee/>
      </main>
     
    </>
  );
}
