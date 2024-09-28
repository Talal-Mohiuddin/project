import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
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
        className="after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-gradient-to-b after:from-transparent after:to-black/70"
      />
      <div className="relative z-10">
        <Header />
        <Hero />
      </div>
    </div>
  );
}
