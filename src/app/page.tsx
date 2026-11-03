import Banner from "@/components/banner";
import BrowseCategories from "@/components/BrowseCategories";
import Footer from "@/components/footer";
import  Navbar  from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-10">
        <Banner />
        <BrowseCategories/>
      </main>
      <Footer/>
    </>
  );
}
