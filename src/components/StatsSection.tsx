'use client';

import React from 'react';
import CountUp from '@/blocks/Components/CountUp/CountUp';
import AnimatedContent from '@/blocks/Components/AnimatedContent/AnimatedContent';

const stats = [
  {
    value: 4,
    suffix: '+',
    label: 'Competitions Won',
    description: 'National & city-level victories',
  },
  {
    value: 15,
    suffix: 'M+',
    label: 'Content Reach',
    description: 'Views across platforms',
  },
  {
    value: 3,
    suffix: '+',
    label: 'Projects Launched',
    description: 'Live products in production',
  },
  {
    value: 2,
    suffix: '+',
    label: 'Years Building',
    description: 'Designing & developing',
  },
];

export default function StatsSection() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-16">
      {/* Divider line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-16" />

      <AnimatedContent distance={30} delay={0}>
        <h2 className="text-center text-sm font-semibold tracking-[0.3em] text-cyan-400 uppercase mb-12">
          By the numbers
        </h2>
      </AnimatedContent>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <AnimatedContent
            key={stat.label}
            distance={30}
            delay={index * 0.1}
            className="group"
          >
            <div className="relative flex flex-col items-center text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/20 hover:bg-white/[0.04] transition-all duration-300">
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Number */}
              <div className="relative z-10 flex items-end gap-0.5 mb-2">
                <CountUp
                  to={stat.value}
                  duration={2}
                  delay={index * 0.15}
                  className="text-4xl md:text-5xl font-extrabold text-white tabular-nums"
                />
                <span className="text-3xl md:text-4xl font-extrabold text-cyan-400 leading-none mb-0.5">
                  {stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="relative z-10 text-sm font-semibold text-gray-200 mb-1">
                {stat.label}
              </p>

              {/* Description */}
              <p className="relative z-10 text-xs text-gray-500">
                {stat.description}
              </p>
            </div>
          </AnimatedContent>
        ))}
      </div>

      {/* Bottom divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mt-16" />
    </section>
  );
}
