'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedContent({
  children,
  distance = 40,
  direction = 'vertical',
  reverse = false,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = '',
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once: true, amount: threshold });

  const offset = reverse ? -distance : distance;
  const isHorizontal = direction === 'horizontal';

  const initialX = isHorizontal ? offset : 0;
  const initialY = isHorizontal ? 0 : offset;

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
          delay,
        },
      });
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: animateOpacity ? initialOpacity : 1,
        scale,
        x: initialX,
        y: initialY,
      }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
