import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCardProps {
  project: {
    id: number;
    number: string;
    title: string;
    description: string;
    detailedDescription?: string; // tambah field ini di data project
    role?: string;
    year?: string;
    type?: string;
    techstack: string[];
    techLabels?: string[]; // nama label tech, e.g. ["Next.js", "TypeScript"]
    imageSrc: string;
    link: string;
  };
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(
  ({ project, index }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pattern = index % 4;
    let numberPositionClasses = "";
    let contentAlignmentClasses = "";
    let imageOrderClass = "";
    let textOrderClass = "";

    switch (pattern) {
      case 0:
        numberPositionClasses = "top-4 left-4";
        contentAlignmentClasses = "text-right items-end";
        textOrderClass = "order-1";
        imageOrderClass = "order-2";
        break;
      case 1:
        numberPositionClasses = "bottom-4 left-4";
        contentAlignmentClasses = "text-right items-end";
        textOrderClass = "order-2";
        imageOrderClass = "order-1";
        break;
      case 2:
        numberPositionClasses = "top-4 right-4";
        contentAlignmentClasses = "text-left items-start";
        textOrderClass = "order-1";
        imageOrderClass = "order-2";
        break;
      case 3:
        numberPositionClasses = "bottom-4 right-4";
        contentAlignmentClasses = "text-left items-start";
        textOrderClass = "order-2";
        imageOrderClass = "order-1";
        break;
    }

    const handleOpenModal = useCallback(() => {
      setIsModalOpen(true);
      document.body.style.overflow = "hidden"; // lock scroll
    }, []);

    const handleCloseModal = useCallback(() => {
      setIsModalOpen(false);
      document.body.style.overflow = ""; // unlock scroll
    }, []);

    // ESC key support
    useEffect(() => {
      if (!isModalOpen) return;
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") handleCloseModal();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isModalOpen, handleCloseModal]);

    return (
      <>
        <motion.div className="relative flex flex-col justify-between py-6 px-15 md:m-0 m-5 border border-white border-opacity-20 bg-transparent overflow-hidden h-full">
          <div
            className={`absolute md:text-6xl text-3xl p-6 font-bold text-white text-opacity-10 ${numberPositionClasses}`}
          >
            {project.number}
          </div>

          <div
            className="flex flex-col justify-between h-full cursor-pointer"
            onClick={handleOpenModal}
          >
            <div
              className={`flex flex-col ${contentAlignmentClasses} ${textOrderClass} z-10 p-6`}
            >
              <div>
                <h3 className="md:text-xl text-md font-semibold text-white">
                  {project.title}
                </h3>
                <p className="md:text-sm text-xs text-gray-400">
                  {project.description}
                </p>
              </div>
              <div className="mt-2">
                <div className="flex space-x-2">
                  {project.techstack.map((icon, i) => (
                    <Image
                      key={i}
                      src={icon}
                      alt={project.techLabels?.[i] ?? `Tech ${i}`}
                      width={24}
                      height={24}
                    />
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              className={`relative w-full flex-grow rounded-xl overflow-hidden z-10 ${imageOrderClass}`}
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={project.imageSrc}
                alt={`${project.title} image`}
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ y: 24, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 24, opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-xl bg-zinc-950 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
              >
                {/* ── Hero image header ── */}
                <div className="relative h-52 md:h-64 shrink-0 overflow-hidden">
                  <Image
                    src={project.imageSrc}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                  />
                  {/* gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  {/* controls row on top of image */}
                  <div className="absolute top-3 right-3 flex gap-2 z-10">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 rounded-full transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                      Visit Live
                    </a>
                    <button
                      onClick={handleCloseModal}
                      aria-label="Close modal"
                      className="w-8 h-8 flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/15 rounded-full transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* title + tags overlaid on bottom of image */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <div className="flex flex-wrap gap-1.5 mb-2 text-white">
                      {project.techstack.map(
                        (icon, i) => (
                          <span
                            key={i}
                            className="flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10"
                          >
                            <Image
                              src={icon}
                              alt={project.techLabels?.[i] ?? `Tech ${i + 1}`}
                              width={14}
                              height={14}
                            />
                            {project.techLabels?.[i] ?? `Tech ${i + 1}`}
                          </span>
                        )
                      )}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white leading-tight">
                      {project.title}
                    </h2>
                    <p className="text-sm text-white/50 mt-0.5">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* ── Scrollable body ── */}
                <div className="overflow-y-auto px-5 pb-6 pt-4 flex flex-col gap-4">
                  {/* stat pills */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: "Role", value: project.role ?? "Developer" },
                      { label: "Year", value: project.year ?? "2024" },
                      { label: "Type", value: project.type ?? "Web App" },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-white/[0.04] border border-white/[0.07] rounded-xl px-3 py-2.5"
                      >
                        <p className="text-[10px] uppercase tracking-wider text-white/35 mb-1">
                          {label}
                        </p>
                        <p className="text-sm font-medium text-white">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* description */}
                  <div className="text-sm text-white/55 leading-relaxed font-light mt-1">
                    {project.detailedDescription ? (
                      <p>{project.detailedDescription}</p>
                    ) : (
                      <div className="space-y-4">
                        <p>
                          Here you can add a more detailed description about the project, the challenges you faced, the solutions you implemented, and the impact of the final product.
                        </p>
                        <p>
                          Currently, this text is a placeholder since you haven't added a <code className="text-cyan-400 bg-cyan-500/10 px-1 rounded">detailedDescription</code> field to this project in your page data yet!
                        </p>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                        <p>
                          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;