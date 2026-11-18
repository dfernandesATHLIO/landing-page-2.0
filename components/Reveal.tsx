"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import styles from "./Reveal.module.css";

type Variant = "up" | "left" | "right" | "scale";

interface RevealProps {
  as?: ElementType;
  variant?: Variant;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
  id?: string;
  children?: ReactNode;
}

/** Fades/slides its content in the first time it scrolls into view. */
export default function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  id,
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = [
    styles[variant],
    delay ? styles[`d${delay}`] : "",
    visible ? styles.visible : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag ref={ref} id={id} className={classes}>
      {children}
    </Tag>
  );
}
