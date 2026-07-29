"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Collections from "@/components/Collections";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import Bridal from "@/components/Bridal";
import CraftsmanshipTimeline from "@/components/CraftsmanshipTimeline";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import Store from "@/components/Store";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-luxury-gold z-[9997] origin-left"
      style={{ scaleX }}
    />
  );
}

function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="w-8 h-[1px] bg-luxury-gold/20" />
      <div className="w-1 h-1 rounded-full bg-luxury-gold/40 mx-2" />
      <div className="w-8 h-[1px] bg-luxury-gold/20" />
    </div>
  );
}

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  return (
    <main ref={mainRef} className="relative bg-primary-bg overflow-hidden">
      <ScrollProgress />

      <Hero />
      <SectionDivider />
      <About />
      <SectionDivider />
      <Collections />
      <SectionDivider />
      <FeaturedProducts />
      <SectionDivider />
      <WhyChooseUs />
      <SectionDivider />
      <Bridal />
      <SectionDivider />
      <CraftsmanshipTimeline />
      <SectionDivider />
      <Statistics />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <Store />
      <SectionDivider />
      <Contact />

      <Footer />
    </main>
  );
}
