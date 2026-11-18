"use client";

import { useEffect, useRef, useState } from "react";

interface CounterProps {
  target: number;
  suffix?: string;
  className?: string;
  suffixClassName?: string;
  duration?: number;
}

/** Counts up to `target` (ease-out cubic) the first time it scrolls into view. */
export default function Counter({
  target,
  suffix,
  className,
  suffixClassName,
  duration = 1400,
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const startVal = Math.max(0, target - Math.ceil(target * 0.6));
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(startVal + (target - startVal) * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return (
    <div ref={ref} className={className}>
      {value.toLocaleString("en-US")}
      {suffix && <span className={suffixClassName}>{suffix}</span>}
    </div>
  );
}
