'use client';

import React, { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import GooeyNav from "@/blocks/Components/GooeyNav/GooeyNav";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { gilroy } from "@/fonts/fonts";

// Define items for GooeyNav with dropdown structure
const items = [
  { label: "Home", href: "/" },
  { 
    label: "Projects", 
    href: "#",
    dropdown: [
      {
        label: "ODD Assignment",
        items: [
          { label: "Assignment 1", href: "https://tugas1.xynnthinc.my.id/" },
          { label: "Assignment 2", href: "https://tugas.xynnthinc.my.id/" },
          { label: "Assignment 3", href: "https://tugasganjil.xynnthinc.my.id/tes1/" },
          { label: "Assignment 4", href: "https://tugasganjil.xynnthinc.my.id/perpustakaan/" },
          { label: "Wellify", href: "https:wellify.xynnthinc.my.id" },
        ]
      },
      {
        label: "Competitions",
        items: [
          { label: "Lost N Found", href: "https://lost.richkeydev.net/" },
        ]
      }
    ]
  },
  { label: "Awards", href: "/Awards" },
  { label: "Contact", href: "/Contact" },
];

// Define social media links and placeholder icon paths
const socialLinks = [
  { platform: "GitHub", href: "https://github.com/xynnthinc", iconPath: "/icons/github_icon.svg" },
  { platform: "Instagram", href: "https://www.instagram.com/xynnthinc", iconPath: "/icons/instagram_icon.svg" },
  { platform: "Gmail", href: "mailto:zakiimaalik@gmail.com", iconPath: "/icons/gmail_icon.svg" },
];


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // State for mobile menu (moved from page.tsx)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(null);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<string | null>(null);
  
  // Desktop detection for cursor — prevents spring animations from running on mobile
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  
  // Get current pathname
  const pathname = usePathname();

  // Calculate active index based on pathname
  const activeIndex = items.findIndex(item => {
    if (item.href === pathname) return true;
    if (item.dropdown) {
      return item.dropdown.some(group => 
        group.items.some(subItem => subItem.href === pathname)
      );
    }
    return false;
  });

  // --- Lenis Smooth Scrolling Implementation ---
  const lenis = useRef<Lenis | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      lenis.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.current?.raf(time);
        rafId.current = requestAnimationFrame(raf);
      }

      rafId.current = requestAnimationFrame(raf);

      return () => {
        if (rafId.current) cancelAnimationFrame(rafId.current);
        lenis.current?.destroy();
      };
    }
  }, []);
  // --- End Lenis Implementation ---


  // --- Custom Cursor Implementation (desktop only) ---
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const dotSpringConfig = { damping: 25, stiffness: 200 };
  const outlineSpringConfig = { damping: 35, stiffness: 400 };

  const dotX = useSpring(cursorX, dotSpringConfig);
  const dotY = useSpring(cursorY, dotSpringConfig);

  const outlineX = useSpring(dotX, outlineSpringConfig);
  const outlineY = useSpring(dotY, outlineSpringConfig);

  useEffect(() => {
    if (!isDesktop) return;
    
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    setTimeout(() => {
        cursorX.set(window.innerWidth / 2);
        cursorY.set(window.innerHeight / 2);
    }, 0);

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY, isDesktop]);
  // --- End Custom Cursor Implementation ---


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gilroy.variable} antialiased font-gilroy bg-black`}
        style={{ cursor: isDesktop ? 'none' : 'auto' }}
        >
        {/* Custom Cursor — only rendered on desktop to avoid spring overhead on mobile */}
        {isDesktop && (
          <>
            <motion.div 
                style={{
                x: dotX,
                y: dotY,
                pointerEvents: 'none',
                left: 0,
                top: 0,
                position: 'fixed',
                zIndex: 9999,
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#06b6d4',
                boxShadow: '0 0 10px 4px rgba(6, 182, 212, 0.7)',
                }}
            />
            <motion.div
                style={{
                x: outlineX,
                y: outlineY,
                pointerEvents: 'none',
                left: 0,
                top: 0,
                position: 'fixed',
                zIndex: 9998,
                transform: 'translate(-50%, -50%)',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                border: '2px solid #0891b2',
                opacity: 0.5,
                }}
            />
          </>
        )}
        {/* Header Section */}
        <header className="sticky top-0 z-50 flex w-full items-center justify-between px-4 py-2 md:px-8 md:py-3 bg-transparent backdrop-blur-[3px]">
          {/* Logo */}
            <Link href="/" passHref>
             <Image
                src="/logo/lauv-logo2.svg"
                alt="Lauv Logo"
                width={35}
                height={35}
                className="m-4 md:m-10 transition-all duration-300 hover:scale-150 hover:rotate-10 hover:brightness-125"
             />
            </Link>


          {/* Desktop Navigation - hidden on small screens */}
          <div className="hidden lg:block font-medium" style={{ height: '70px', width: '500px', position: 'relative' }}>
            <GooeyNav
              items={items}
              particleCount={15}
              particleDistances={[90, 10]}
              particleR={100}
              initialActiveIndex={activeIndex !== -1 ? activeIndex : 0}
              animationTime={600}
              timeVariance={300}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>

          {/* Hamburger button - visible on small and medium screens */}
          <button
            className="lg:hidden text-white p-2 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ease-in-out"></div>
            <div className="w-6 h-0.5 bg-white mb-1.5 transition-all duration-300 ease-in-out"></div>
            <div className="w-6 h-0.5 bg-white transition-all duration-300 ease-in-out"></div>
          </button>
        </header>

        {/* Mobile menu - only visible when mobileMenuOpen is true */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-transparent backdrop-blur-[10px] pt-10 fixed top-[72px] sm:top-[80px] md:top-[96px] right-0 left-0 z-40 p-4 sm:p-5 overflow-y-auto h-[calc(100vh - 72px)] sm:h-[calc(100vh - 80px)] md:h-[calc(100vh - 96px)]">
            <nav className="flex flex-col space-y-4">
              {items.map((item, index) => (
                <div key={index}>
                  {item.dropdown ? (
                    <div>
                      <button
                        className="text-white hover:text-gray-300 py-2 px-4 font-medium text-base sm:text-lg w-full text-left flex justify-between items-center"
                        onClick={() => setMobileDropdownOpen(mobileDropdownOpen === item.label ? null : item.label)}
                      >
                        {item.label}
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${mobileDropdownOpen === item.label ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileDropdownOpen === item.label && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.dropdown.map((group, groupIndex) => (
                            <div key={groupIndex}>
                              <button
                                className="text-cyan-400 text-sm font-semibold mb-2 px-4 w-full text-left flex justify-between items-center"
                                onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === group.label ? null : group.label)}
                              >
                                {group.label}
                                <svg 
                                  className={`w-3 h-3 transition-transform duration-200 ${mobileSubmenuOpen === group.label ? 'rotate-180' : ''}`} 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              {mobileSubmenuOpen === group.label && (
                                <div className="ml-4 space-y-1 border-l-2 border-cyan-400/30 pl-3">
                                  {group.items.map((subItem, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      href={subItem.href}
                                      className="text-white hover:text-cyan-400 py-2 px-4 block text-sm transition-colors"
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        setMobileDropdownOpen(null);
                                        setMobileSubmenuOpen(null);
                                      }}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-white hover:text-gray-300 py-2 px-4 font-medium text-base sm:text-lg block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
        {/* End Header Section */}

        {children}

        {/* Sticky Social Media Container */}
        <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 bg-black/60 border border-white/[.30] border-dashed rounded-full p-2 md:p-4 flex flex-col items-center space-y-7 md:space-y-5">
          {socialLinks.map((link) => (
            <Link
              key={link.platform}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-110"
            >
              <Image
                src={link.iconPath}
                alt={`${link.platform} icon`}
                width={20}
                height={20}
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
              />
            </Link>
          ))}
        </div>

      </body>
    </html>
  );
}