import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ScrollReveal from "@/components/ScrollReveal";
import TrustBar from "@/components/sections/TrustBar";
import ReplaceTable from "@/components/sections/ReplaceTable";
import CtaBand from "@/components/sections/CtaBand";
import Features from "@/components/sections/Features";
import ComparisonTable from "@/components/sections/ComparisonTable";
import Workflow from "@/components/sections/Workflow";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Faq from "@/components/sections/Faq";
import Blog from "@/components/sections/Blog";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TrustBar />
      <ReplaceTable />
      <CtaBand />
      <Features />
      <ComparisonTable />
      <Workflow />
      <Pricing />
      <Testimonials />
      <Faq />
      <Blog />
      <FinalCta />
      <Footer />
      <ScrollReveal />
    </>
  );
}
