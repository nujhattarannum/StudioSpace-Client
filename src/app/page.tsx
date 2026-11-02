import Banner from "@/components/banner";
import  Navbar  from "@/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-10">
        <Banner />
      </main>
    </>
  );
}
