"use client";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      {/* Gold divider */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-heading text-2xl text-luxury-gold mb-4">
              ARCHANA
            </h3>
            <p className="text-light-gray text-sm leading-relaxed font-body font-light">
              Timeless Elegance. Authentic Gold. Trusted Generations.
            </p>
          </div>

          {/* Working Hours */}
          <div className="md:col-span-2 lg:col-span-3">
            <h4 className="text-white text-sm tracking-widest uppercase mb-5 font-body">
              Working Hours
            </h4>
            <p className="text-luxury-gold/80 font-heading text-lg">
              Mon to Sat 11:30 to 8 pm
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-light-gray/60 text-xs font-body">
              © {new Date().getFullYear()} ARCHANA JEWELERS. All rights reserved.
            </p>
            <p className="text-light-gray/40 text-xs font-body">
              Crafted with care in Bhagalpur
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
