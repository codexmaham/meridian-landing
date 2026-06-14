import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <LogoStrip />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
