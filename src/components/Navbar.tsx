"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Approach", href: "#approach" },
  { name: "Services", href: "#services" },
  { name: "Journey", href: "#journey" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed z-50 transition-all duration-500 left-0 right-0 mx-auto",
        isScrolled
          ? "top-4 max-w-5xl bg-ivory/95 backdrop-blur-md border border-forest/10 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-8"
          : "top-0 max-w-7xl bg-transparent py-6 px-6 md:px-12"
      )}
    >
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group flex flex-col items-start z-50">
          <span className="font-serif text-2xl tracking-widest text-forest">
            ARZU
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-forest/70 mt-1 transition-opacity group-hover:opacity-100">
            Nutritionist
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest text-forest/80 hover:text-forest transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* CTA & Mobile Toggle */}
        <div className="flex items-center space-x-6 z-50">
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm uppercase tracking-wider bg-forest text-ivory hover:bg-forest/90 transition-colors border border-forest hover:border-forest/90"
          >
            Book Consultation
          </Link>
          <button
            className="md:hidden text-forest"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-ivory z-40 flex flex-col justify-center items-center space-y-8 transition-transform duration-500 ease-[0.16,1,0.3,1] md:hidden",
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-serif text-forest tracking-wider hover:text-gold transition-colors"
          >
            {link.name}
          </Link>
        ))}
        <Link
          href="#contact"
          onClick={() => setIsMobileMenuOpen(false)}
          className="px-8 py-3 mt-4 text-sm uppercase tracking-wider bg-forest text-ivory border border-forest"
        >
          Book Consultation
        </Link>
      </div>
    </motion.nav>
  );
}
