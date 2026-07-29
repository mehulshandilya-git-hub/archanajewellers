"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-4 md:px-8 overflow-hidden"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(247,231,181,0.05) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          <p className="text-luxury-gold tracking-[0.3em] text-sm uppercase mb-4 font-body">
            Get In Touch
          </p>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
            Let&apos;s Create{" "}
            <span className="text-gradient">Together</span>
          </h2>
          <div className="w-12 h-[1px] bg-luxury-gold/50 mx-auto mt-6" />
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Glass form */}
          <div className="glass rounded-sm p-6 md:p-10 relative">
            {/* Animated golden borders */}
            <motion.div
              className="absolute top-0 left-0 h-[1px] bg-luxury-gold"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 h-[1px] bg-luxury-gold"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
            />
            <motion.div
              className="absolute top-0 right-0 w-[1px] bg-luxury-gold"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.9 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-[1px] bg-luxury-gold"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.1 }}
            />

            <form className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-light-gray/50 focus:outline-none focus:border-luxury-gold/50 transition-all duration-500 font-body"
                  />
                </div>
                <div className="group">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-light-gray/50 focus:outline-none focus:border-luxury-gold/50 transition-all duration-500 font-body"
                  />
                </div>
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-light-gray/50 focus:outline-none focus:border-luxury-gold/50 transition-all duration-500 font-body"
                />
              </div>
              <div>
                <select className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white/50 text-sm focus:outline-none focus:border-luxury-gold/50 transition-all duration-500 font-body appearance-none">
                  <option value="" className="bg-primary-bg">Select Interest</option>
                  <option value="nosepins" className="bg-primary-bg">Gold Nosepins</option>
                  <option value="bridal" className="bg-primary-bg">Bridal Jewellery</option>
                  <option value="necklaces" className="bg-primary-bg">Gold Necklaces</option>
                  <option value="rings" className="bg-primary-bg">Gold Rings</option>
                  <option value="other" className="bg-primary-bg">Other</option>
                </select>
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full bg-transparent border border-white/10 rounded-sm px-4 py-3 text-white text-sm placeholder:text-light-gray/50 focus:outline-none focus:border-luxury-gold/50 transition-all duration-500 font-body resize-none"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-4 bg-luxury-gold text-primary-bg rounded-full text-sm tracking-widest uppercase font-body font-semibold hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
