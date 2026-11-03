import Banner from "@/components/banner";
import BrowseCategories from "@/components/BrowseCategories";
import FeaturedStudios from "@/components/FeaturedStudios";
import Footer from "@/components/footer";
import HostGuarantee from "@/components/HostGuarantee";
import HowBookingWorks from "@/components/HowBookingWorks";
import  Navbar  from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-10">
        <Banner />
        <BrowseCategories/>
        <FeaturedStudios/>
        <HowBookingWorks/>
        <HostGuarantee/>
      </main>
      <Footer/>
    </>
  );
}
