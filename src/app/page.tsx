"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import MagneticButton from "@/components/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Advanced GSAP animations
    const ctx = gsap.context(() => {
      // 1. Hero Image Clip Path Reveal
      gsap.to(".hero-clip", {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Horizontal Scroll for Philosophy
      if (horizontalSectionRef.current && horizontalContentRef.current) {
        const contentWidth = horizontalContentRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        
        gsap.to(horizontalContentRef.current, {
          x: -(contentWidth - windowWidth),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            start: "top top",
            end: () => `+=${contentWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });
      }

      // 3. Dubai Wellness Text Scroll
      gsap.to(".dubai-text-scroll", {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: ".dubai-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
      
      // 4. Parallax Images
      (gsap.utils.toArray(".parallax-slow") as HTMLElement[]).forEach((el) => {
        gsap.to(el, {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
      
      (gsap.utils.toArray(".parallax-fast") as HTMLElement[]).forEach((el) => {
        gsap.to(el, {
          yPercent: -40,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-ivory">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero-section relative h-screen w-full flex items-center justify-center pt-20">
        <div 
          className="hero-clip absolute inset-0 z-0 bg-cover bg-center" 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop')",
            clipPath: "inset(15% 10% 15% 10%)"
          }}
        >
          <div className="absolute inset-0 bg-forest/30 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto mix-blend-difference text-ivory">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block py-1 px-4 mb-6 text-xs uppercase tracking-widest border border-ivory/50 rounded-full bg-ivory/10 backdrop-blur-md">
              Arzu &middot; Nutritionist &middot; Dubai
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif leading-[0.9] tracking-tight mb-8"
          >
            Nourish Your Body. <br />
            <span className="italic opacity-90 text-gold">Transform Life.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg md:text-xl max-w-2xl font-light leading-relaxed opacity-80"
          >
            Personalized nutrition guidance designed to help you build healthier
            habits, feel your best, and create lasting change.
          </motion.p>
        </div>
      </section>

      {/* About Arzu Section with Overlapping Images */}
      <section id="about" className="py-40 px-6 relative overflow-hidden bg-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 relative h-[600px] w-full">
              <div className="absolute top-0 left-0 w-4/5 h-4/5 z-10 overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop" alt="Arzu at work" className="w-full h-full object-cover parallax-slow" />
              </div>
              <div className="absolute bottom-0 right-0 w-3/5 h-3/5 z-20 overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2070&auto=format&fit=crop" alt="Healthy food" className="w-full h-full object-cover parallax-fast" />
              </div>
            </div>
            
            <div className="md:col-span-6 md:col-start-7 text-forest">
              <h2 className="text-5xl md:text-6xl font-serif mb-8">
                Nutrition that fits <span className="italic text-gold">your life.</span>
              </h2>
              <p className="text-xl font-light mb-12 opacity-80 leading-relaxed">
                As a dedicated nutritionist based in Dubai, I focus on practical, sustainable, and highly personalized nutrition. We won&apos;t rely on restrictive diets; instead, we build habits that seamlessly integrate into your daily routine.
              </p>

              <div className="grid grid-cols-2 gap-8 border-t border-forest/10 pt-8">
                {[
                  { number: "500+", label: "Clients Guided" },
                  { number: "8+", label: "Years Experience" },
                  { number: "95%", label: "Satisfaction" }
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-4xl font-serif text-gold mb-2">{stat.number}</div>
                    <div className="text-xs uppercase tracking-widest opacity-60">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pinned Horizontal Scroll - Philosophy */}
      <div className="bg-forest">
        <section 
          id="approach" 
          ref={horizontalSectionRef} 
          className="h-screen bg-forest text-ivory overflow-hidden flex flex-col justify-center relative"
        >
          <div className="absolute top-12 left-6 md:left-12 text-sm uppercase tracking-widest opacity-50">
            My Philosophy
          </div>
          
          <div ref={horizontalContentRef} className="flex gap-32 px-12 md:px-32 items-center h-full w-[300vw] md:w-[200vw]">
            <div className="w-[80vw] md:w-[40vw] flex-shrink-0">
              <h2 className="text-6xl md:text-8xl font-serif leading-none">
                A modern <br/><span className="text-gold italic">approach</span> <br/>to well-being.
              </h2>
            </div>
            
            {[
              { num: "01", title: "Personalized", desc: "Nutrition plans designed around your individual goals, preferences, and lifestyle." },
              { num: "02", title: "Balanced", desc: "A realistic approach that doesn't rely on extreme restrictions or fad diets." },
              { num: "03", title: "Sustainable", desc: "Building habits that can actually become part of your everyday life long-term." },
              { num: "04", title: "Evidence-Based", desc: "Practical nutrition guidance grounded in reliable, peer-reviewed scientific principles." }
            ].map((item) => (
              <div key={item.num} className="w-[80vw] md:w-[35vw] flex-shrink-0 group">
                <div className="text-gold opacity-30 text-8xl md:text-[150px] font-serif leading-none mb-4 group-hover:opacity-100 transition-opacity duration-700">
                  {item.num}
                </div>
                <h3 className="text-4xl md:text-5xl font-serif mb-6">{item.title}</h3>
                <p className="text-xl opacity-70 font-light max-w-md">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Services Section with Bento Grid */}
      <section id="services" className="py-40 px-6 bg-beige">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-serif text-forest">Tailored Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
            <div className="md:col-span-2 bg-ivory p-12 flex flex-col justify-between group hover:bg-forest hover:text-ivory transition-colors duration-500">
              <h3 className="text-3xl font-serif text-forest group-hover:text-gold transition-colors">Personalized Nutrition Plans</h3>
              <MagneticButton>
                <div className="w-12 h-12 rounded-full border border-forest/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-colors">
                  &rarr;
                </div>
              </MagneticButton>
            </div>
            
            <div className="bg-ivory p-12 flex flex-col justify-between group hover:bg-forest hover:text-ivory transition-colors duration-500">
              <h3 className="text-3xl font-serif text-forest group-hover:text-gold transition-colors">Weight Management</h3>
              <MagneticButton>
                <div className="w-12 h-12 rounded-full border border-forest/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-colors">
                  &rarr;
                </div>
              </MagneticButton>
            </div>
            
            <div className="bg-ivory p-12 flex flex-col justify-between group hover:bg-forest hover:text-ivory transition-colors duration-500">
              <h3 className="text-3xl font-serif text-forest group-hover:text-gold transition-colors">Sports Nutrition</h3>
              <MagneticButton>
                <div className="w-12 h-12 rounded-full border border-forest/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-colors">
                  &rarr;
                </div>
              </MagneticButton>
            </div>

            <div className="md:col-span-2 bg-ivory p-12 flex flex-col justify-between group hover:bg-forest hover:text-ivory transition-colors duration-500 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop')] bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-700"></div>
              <h3 className="text-3xl font-serif text-forest group-hover:text-gold transition-colors relative z-10">One-on-One Consultations</h3>
              <MagneticButton className="relative z-10">
                <div className="w-12 h-12 rounded-full border border-forest/30 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-colors">
                  &rarr;
                </div>
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* Dubai Wellness Section (Animated Text) */}
      <section className="dubai-section relative py-40 overflow-hidden bg-ivory flex flex-col justify-center min-h-[80vh]">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale"></div>
        </div>
        
        <div className="dubai-text-scroll whitespace-nowrap text-[15vw] font-serif text-forest/10 leading-none absolute top-1/2 -translate-y-1/2">
          HEALTHY LIVING DUBAI LIFESTYLE WELLNESS
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 text-center bg-ivory/80 backdrop-blur-md p-16 rounded-3xl border border-forest/10">
          <span className="text-xs uppercase tracking-widest text-forest/70 mb-6 block">Based in Dubai</span>
          <h2 className="text-4xl md:text-5xl font-serif text-forest mb-6">
            Designed around your lifestyle.
          </h2>
          <p className="text-lg text-forest/80 font-light">
            Whether you&apos;re navigating a busy corporate schedule, managing family life, or looking to elevate your fitness in this vibrant city, your nutrition should support your lifestyle, not complicate it.
          </p>
        </div>
      </section>

      {/* The Journey Section - Sticky Sidebar */}
      <section id="journey" className="py-40 px-6 bg-forest text-ivory relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 relative">
            <div className="sticky top-40">
              <span className="text-xs uppercase tracking-widest text-gold mb-6 block">The Process</span>
              <h2 className="text-6xl md:text-7xl font-serif mb-8">
                Your <br className="hidden md:block"/> Journey.
              </h2>
              <p className="text-xl text-ivory/70 font-light max-w-md">
                Sustainable transformation is a process, not a quick fix. Here is how we work together.
              </p>
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col gap-32 pt-20 md:pt-40">
            {[
              { step: "01", title: "Understand", desc: "We begin by diving deep into your current habits, challenges, and goals." },
              { step: "02", title: "Personalize", desc: "I create a bespoke nutrition framework tailored entirely to your needs." },
              { step: "03", title: "Nourish", desc: "You learn how to fuel your body effectively without giving up the foods you love." },
              { step: "04", title: "Transform", desc: "Together, we build lasting changes that elevate your energy and well-being." }
            ].map((phase) => (
              <div key={phase.step} className="border-l border-gold/30 pl-10 relative group">
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-gold/50 group-hover:bg-gold group-hover:scale-150 transition-all"></div>
                <div className="text-gold text-2xl font-serif mb-4">{phase.step}.</div>
                <h3 className="text-4xl font-serif mb-6">{phase.title}</h3>
                <p className="text-xl text-ivory/70 font-light leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-40 px-6 bg-forest text-ivory text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gold/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-6xl md:text-8xl font-serif mb-12">
              Start your <br className="hidden md:block" />
              <span className="italic text-gold">transformation.</span>
            </h2>
            
            <MagneticButton href="mailto:contact@example.com">
              <div className="w-48 h-48 bg-gold rounded-full flex items-center justify-center text-forest text-sm uppercase tracking-widest hover:scale-95 transition-transform duration-500">
                Book Consult
              </div>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
