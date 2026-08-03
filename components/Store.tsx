"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function MagneticButton({ children, className = "", href }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const dist = Math.sqrt(x * x + y * y);
      const strength = Math.max(0, 1 - dist / 150);
      el.style.transform = `translate(${x * 0.12 * strength}px, ${y * 0.12 * strength}px)`;
    };
    const handleMouseLeave = () => { el.style.transform = "translate(0, 0)" };
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <a ref={ref} href={href || "#"} className={`inline-flex items-center justify-center px-8 py-4 rounded-full text-sm tracking-widest uppercase font-body font-semibold transition-all duration-500 ${className}`}
      style={{ transition: "transform 0.1s ease" }}>
      {children}
    </a>
  );
}

export default function Store() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  return (
    <section id="store" ref={sectionRef} className="relative py-24 md:py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" style={{ opacity: titleOpacity, y: titleY }}>
          <p className="text-luxury-gold tracking-[0.3em] text-sm uppercase mb-4 font-body">Visit Us</p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
            Our <span className="text-gradient">Showroom</span>
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Map */}
          <motion.div
            className="glass-gold rounded-sm overflow-hidden h-[300px] md:h-[400px]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3613.456!2d87.123!3d25.234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE0JzAyLjQiTiA4N8KwMDcnMjIuOCJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ARCHANA JEWELERS Location"
            />
          </motion.div>

          {/* Store Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-gold rounded-sm p-6 md:p-8">
              <h3 className="font-heading text-2xl text-luxury-gold mb-4">ARCHANA JEWELERS</h3>
              <div className="space-y-3 text-light-gray font-body text-sm leading-relaxed">
                <p>DN Singh Rd, Near Devendra Jalpan Hotel, Goshalla, Bhagalpur, Bihar 812001</p>
                <div className="w-full h-[1px] bg-white/5" />
                <p className="flex items-center gap-2">
                  <span className="text-luxury-gold">✆</span>
                  <a href="tel:+917541087346" className="hover:text-luxury-gold transition-colors">+91 75410 87346</a>
                </p>
                <div className="w-full h-[1px] bg-white/5" />
                <p>🕐 Opens Monday to Saturday Timing - 11:30 to 8:00 pm</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <MagneticButton
                href="tel:+917541087346"
                className="bg-luxury-gold text-primary-bg hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
              >
                Call Now
              </MagneticButton>
              <MagneticButton
                href="https://maps.google.com/?q=DN+Singh+Road+Bhagalpur+Bihar+812001"
                className="border border-luxury-gold/40 text-luxury-gold hover:bg-luxury-gold/10"
              >
                Get Directions
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
