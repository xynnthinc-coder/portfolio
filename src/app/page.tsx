// app/page.tsx

"use client"

import React from "react";
import dynamic from "next/dynamic";

// Above-the-fold components — imported eagerly (visible immediately)
import BlurText from "@/blocks/TextAnimations/BlurText/BlurText";
import TrueFocus from "@/blocks/TextAnimations/TrueFocus/TrueFocus";
import Threads from "@/blocks/Backgrounds/Threads/Threads";
import SkillTag from '@/components/SkillTag';

// Below-the-fold components — lazy loaded (only loaded when scrolled into view)
const TiltedCard = dynamic(() => import("@/blocks/Components/TiltedCard/TiltedCard"), { ssr: false });
const ExperienceTimeline = dynamic(() => import("@/components/ExperienceTimeline"), { ssr: false });
const ProjectCard = dynamic(() => import("@/components/ProjectCard"), { ssr: false });
const ScrollVelocity = dynamic(() => import("@/blocks/TextAnimations/ScrollVelocity/ScrollVelocity"), { ssr: false });
const AboutMe = dynamic(() => import("@/components/AboutMe"), { ssr: false });

// Define your projects array
const projects = [
  {
    id: 1,
    number: '01',
    title: 'Wellify - Healthy Lifestyle Companion',
    description: 'Web Developer',
    techstack: [
      '/techstack/php.svg',
      '/techstack/css.svg',
      '/techstack/js.svg',
    ],
    imageSrc: '/proj/wellify.png',
    link: 'https://wellify.xynnthinc.my.id/',
  },
  {
    id: 2,
    number: '02',
    title: 'Lost and Found',
    description: 'Web Developer',
    techstack: [
      '/techstack/php.svg',
      '/techstack/tailwind.svg',
      '/techstack/js.svg',
    ],
    imageSrc: '/proj/lnf.png',
    link: 'https://conso-frontend-v2.onrender.com/',
  },
  {
    id: 3,
    number: '03',
    title: 'Hummathica',
    description: 'Mobile App Developer',
    techstack: [
      '/techstack/java.svg',
      '/techstack/xml.svg',
    ],
    imageSrc: '/proj/hummathica.png',
    link: '#',
  },
];

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

// Define your skill arrays
const devSkills = [
  'Next.js', 'Tailwind', 'React', 'Javascript', 'CSS', 'Node.js',
  'Python', 'Springboot', 'Flutterflow', 'Firebase', 'Supabase', 'MySQL'
];

const contentSkills = [
  'Figma', 'Canva', 'Capcut', 'Adobe Premiere Pro', 'Adobe Illustrator'
];

export default function Home() {
  return (
    <>
      {/* Main content area */}
      <main className="flex-grow flex flex-col items-center h-full relative pt-20"> {/* Added padding top to account for fixed header */}
        {/* Single Threads instance — CSS controls visibility per breakpoint */}
        <div style={{ width: '100%', height: '600px', position: 'absolute', bottom: '50'}} className="opacity-100 md:opacity-100 max-md:opacity-10">
          <Threads
            amplitude={2.5}
            distance={0}
            enableMouseInteraction={false}
          />
        </div>

        {/* ... other main content elements ... */}
        <div className="w-full flex justify-center items-center my-4 md:mt-15 text-center font-bold relative px-4 md:px-0">
          <BlurText
            text="Hi, I'm Zakii"
            delay={150}
            animateBy="letters"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="lg:text-9xl md:text-7xl text-4xl text-center"
          />
        </div>

        <div className="font-bold text-center opacity-0 animate-fadeIn mt-1 md:mt-3">
          <TrueFocus
            sentence="Developer   Creator   Student"
            manualMode={true}
            blurAmount={5}
            borderColor="cyan"
            animationDuration={0.3}
            pauseBetweenAnimations={1}
            />
          </div>

        <div className="w-full items-center mt-60 mb-4 relative h-[300px] hidden md:block">
          <ScrollVelocity
            texts={['Zakii Maalik', 'Developer Creator Student']}
            className="custom-scroll-text"
          />
        </div>

        <div className="flex-grow flex flex-col md:flex-row items-center justify-center w-full md:w-9xl md:mt-35 mt-10 md:space-x-50 space-x-0">
          {/* Tech Stack Section Start */}
          <div className="flex flex-col w-full max-w-lg px-4 md:px-0 mt-10 mb-20 space-y-8">
            {/* DEVELOP Card */}
            <div className="relative p-6 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 custom-corner-border">
              <h3 className="text-white font-bold md:text-2xl text-lg tracking-wide mb-3">
                DEVELOP
              </h3>
              <p className="text-gray-400 md:text-md text-sm mt-2 leading-relaxed mb-5">
                Started creating mobile applications using Flutter, FlutterFlow, and Firebase and eventually switched to Web Development using NextJS, React, and Tailwind
              </p>
              <h4 className="text-cyan-300 font-semibold mb-3 text-base">
                Skillset &amp; tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {devSkills.map(skill => (
                  <SkillTag key={skill} skillName={skill} />
                ))}
              </div>
            </div>

            {/* CREATE Card */}
            <div className="relative p-6 rounded-lg transition-transform duration-300 ease-in-out hover:scale-105 custom-corner-border">
              <h3 className="text-white font-bold md:text-2xl text:lg tracking-wide mb-3">
                CREATE
              </h3>
              <p className="text-gray-400 md:text-md text-sm mt-2 leading-relaxed mb-5">
                My content creation journey evolved from a side hustle to serving other creators, achieving an average reach of 15 million within 90 days.
              </p>
              <h4 className="text-cyan-300 font-semibold mb-3 text-base">
                Skillset &amp; Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {contentSkills.map(skill => (
                  <SkillTag key={skill} skillName={skill} />
                ))}
              </div>
            </div>
          </div>
          {/* Tech Stack Section End */}

          {/* What I do Section */}
          <div className="flex flex-col">
            <BlurText
              text="What I do"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="md:text-7xl text-3xl font-extrabold"
            />

            <div className="hidden md:block mt-10 mb-20">
              <TiltedCard
                imageSrc="/photos/me.jpg"
                altText="Zakii"
                captionText="Zakii Maalik"
                containerHeight="600px"
                containerWidth="500px"
                imageHeight="600px"
                imageWidth="500px"
                rotateAmplitude={10}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <p className="bg-transparent px-4 py-2 border-1 border-dashed rounded-lg opacity-50 font-bold m-5 absolute top-5 left-85">
                    Zakii
                  </p>
                }
              />
            </div>

            <div className="md:hidden mt-10 mb-20">
              <TiltedCard
                imageSrc="/photos/me.jpg"
                altText="Zakii"
                captionText="Zakii Maalik"
                containerHeight="400px"
                containerWidth="300px"
                imageHeight="400px"
                imageWidth="300px"
                rotateAmplitude={10}
                scaleOnHover={1.1}
                showMobileWarning={false}
                showTooltip={false}
                displayOverlayContent={true}
                overlayContent={
                  <p className="bg-transparent px-4 py-2 border-1 border-dashed rounded-lg opacity-50 font-bold m-5 absolute">
                    Zakii
                  </p>
                }
              />
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <AboutMe />

        {/* Experience Section */}
        <div className="flex w-full items-center justify-center p-4 md:mt-25 mt-5">
          <BlurText
            text=" My Experience"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="md:text-7xl text-3xl font-extrabold"
          />
        </div>
        <ExperienceTimeline />

        <div className="flex w-full items-center justify-center p-4 md:mt-25 mt-5 font-extrabold">
          <BlurText
            text=" My Projects"
            delay={150}
            animateBy="letters"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="md:text-7xl text-3xl font-extrabold"
          />
        </div>

        {/* Projects Section Start */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-[1400px] mx-auto mt-10">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        {/* Projects Section End */}
      </main>

      {/* Footer Section */}
      <footer className="flex w-full items-center justify-center p-4 border-t border-white/[.15] text-white/50 text-sm font-light mt-20">
        <p>&copy; {new Date().getFullYear()} Zakii Maalik. All rights reserved.</p>
      </footer>
    </>
  );
}