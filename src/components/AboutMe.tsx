'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import BlurText from '@/blocks/TextAnimations/BlurText/BlurText';
import ShinyText from '@/blocks/TextAnimations/ShinyText/ShinyText';
import AnimatedContent from '@/blocks/Components/AnimatedContent/AnimatedContent';

// Lazy load DotGrid — it pulls in GSAP + InertiaPlugin (~50KB) and runs a canvas render loop
const DotGrid = dynamic(() => import('@/blocks/Backgrounds/DotGrid/DotGrid'), { ssr: false });

export default function AboutMe() {
  return (
    /* ── Outer wrapper ── */
    <section
      id="about"
      className="w-full flex items-center justify-center px-3 py-6 sm:px-6 sm:py-10 md:px-10 md:py-12"
    >
      {/* ── The card ── */}
      <div
        className="relative w-full rounded-xl sm:rounded-2xl overflow-hidden flex flex-col items-center justify-center border border-white/[0.08]"
        style={{
          background: 'rgba(8, 8, 8, 0.95)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.6)',
        }}
      >

        {/* ── DotGrid fills the card ── */}
        <div className="absolute inset-0 z-0">
          <DotGrid
            dotSize={4}
            gap={28}
            baseColor="#222222"
            activeColor="#777777"
            proximity={120}
            speedTrigger={80}
            shockRadius={200}
            shockStrength={4}
            resistance={800}
            returnDuration={1.8}
            className="w-full h-full"
          />
        </div>

        {/* ── Content ── */}
        <div className="relative z-20 max-w-5xl mx-auto w-full flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 text-center px-5 sm:px-8 py-12 sm:py-16 md:py-24">

          {/* Badge pill */}
          <AnimatedContent distance={20} delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] text-xs font-medium tracking-widest uppercase backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
              <ShinyText
                text="About Me"
                speed={3}
                color="rgba(255,255,255,0.35)"
                shineColor="rgba(255,255,255,0.85)"
                spread={90}
                delay={1.2}
              />
            </div>
          </AnimatedContent>

          {/* Headline */}
          <div className="w-full">
            <BlurText
              text="I'm Zakii Maulana Maalik, a creative developer focused on high quality & impactful digital experiences."
              delay={60}
              animateBy="words"
              direction="top"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight tracking-tight justify-center text-white"
              stepDuration={0.4}
            />
          </div>

          {/* Thin divider */}
          <div className="w-10 h-px bg-white/15" />

          {/* Paragraph */}
          <div className="max-w-xl mx-auto w-full">
            <BlurText
              text="I have worked with some of the most innovative industry leaders to help build their top-notch products, combining technical expertise with a keen eye for design."
              delay={40}
              animateBy="words"
              direction="bottom"
              stepDuration={0.35}
              animationFrom={{ filter: 'blur(8px)', opacity: 0, y: 20 }}
              animationTo={[
                { filter: 'blur(4px)', opacity: 0.25, y: 6 },
                { filter: 'blur(0px)', opacity: 0.45, y: 0 },
              ]}
              className="text-sm sm:text-base md:text-lg leading-relaxed text-center justify-center text-white/45"
            />
          </div>

        </div>
      </div>
    </section>
  );
}