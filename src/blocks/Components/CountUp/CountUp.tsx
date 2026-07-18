'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);
  const springValue = useSpring(motionValue, {
    damping: 60 - duration * 5,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '0px' });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && startWhen) {
      const timer = setTimeout(() => {
        if (onStart) onStart();
        motionValue.set(direction === 'down' ? from : to);
        setStarted(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, startWhen, delay, direction, from, to, motionValue, onStart]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        const formatted = Intl.NumberFormat('en-US', {
          useGrouping: !!separator,
        })
          .format(Math.round(latest))
          .replace(/,/g, separator);
        ref.current.textContent = formatted;
      }
      if (onEnd && started && Math.round(latest) === (direction === 'down' ? from : to)) {
        onEnd();
      }
    });
    return () => unsubscribe();
  }, [springValue, separator, direction, from, to, onEnd, started]);

  return <span ref={ref} className={className} />;
}
