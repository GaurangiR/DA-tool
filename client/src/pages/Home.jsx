import Features from "../components/Home/Features";
import Logo from "../components/Logo";
import Hero from "../components/Home/Hero";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] to-[#B2EBF2] flex flex-col">
      <Logo />

      <Hero />

      <Features />
    </div>
  );
}

export default Home;
