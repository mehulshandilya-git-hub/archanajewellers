"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const sparkles = useRef<HTMLDivElement>(null);

  const springX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (sparkles.current) {
        const spark = document.createElement("div");
        spark.className =
          "absolute w-1 h-1 rounded-full pointer-events-none";
        spark.style.background = "#D4AF37";
        spark.style.left = e.clientX + "px";
        spark.style.top = e.clientY + "px";
        spark.style.boxShadow = "0 0 6px #D4AF37, 0 0 12px #D4AF37";
        spark.style.animation = "sparkle 0.6s ease-out forwards";
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 600);
      }
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, [data-cursor-hover]"
    );

    const handleHoverStart = () => {
      cursorRef.current?.classList.add("scale-[2]", "opacity-80");
    };
    const handleHoverEnd = () => {
      cursorRef.current?.classList.remove("scale-[2]", "opacity-80");
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverStart);
      el.addEventListener("mouseleave", handleHoverEnd);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverStart);
        el.removeEventListener("mouseleave", handleHoverEnd);
      });
    };
  }, [handleMouseMove]);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.6) 0%, rgba(212,175,55,0) 70%)",
          boxShadow: "0 0 20px rgba(212,175,55,0.3)",
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      />
      <div ref={sparkles} />
    </>
  );
}
