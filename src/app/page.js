import Features from "@/components/Features";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Howitworks from "@/components/Howitworks";
import UserReviews from "@/components/Reviews";
import Separater from "@/components/Separater";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background only for Header and Hero sections */}
      <div className="relative min-h-screen">
        <div
          style={{
            backgroundImage: "url('/herobackground.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
          className="after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-[#0B0A0D] after:z-0"
        />
        <div className="relative z-10">
          <Header />
          <Hero />
          <Separater />
        </div>
      </div>
      <div className="bg-[#0B0A0D] px-10 md:px-3">
        <Features />
     
        <Howitworks />
        <UserReviews />
      </div>
    </div>
  );
}
