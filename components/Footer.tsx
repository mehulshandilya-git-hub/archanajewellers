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

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm tracking-widest uppercase mb-5 font-body">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Home", "Collections", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={link === "Home" ? "#" : `#${link.toLowerCase()}`}
                    className="text-light-gray text-sm hover:text-luxury-gold transition-all duration-300 font-body font-light"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div>
            <h4 className="text-white text-sm tracking-widest uppercase mb-5 font-body">
              Collections
            </h4>
            <ul className="space-y-3">
              {[
                "Gold Nosepins",
                "Bridal Jewellery",
                "Gold Necklaces",
                "Gold Rings",
                "Gold Bangles",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#collections"
                    className="text-light-gray text-sm hover:text-luxury-gold transition-all duration-300 font-body font-light"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm tracking-widest uppercase mb-5 font-body">
              Contact
            </h4>
            <ul className="space-y-3 text-light-gray text-sm font-body font-light">
              <li>DN Singh Rd, Near Devendra</li>
              <li>Jalpan Hotel, Goshalla,</li>
              <li>Bhagalpur, Bihar 812001</li>
              <li>
                <a
                  href="tel:+917827659049"
                  className="hover:text-luxury-gold transition-colors"
                >
                  +91 78276 59049
                </a>
              </li>
            </ul>
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
