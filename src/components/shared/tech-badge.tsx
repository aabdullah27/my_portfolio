"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TechBadgeProps {
  name: string;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
}

export function TechBadge({ 
  name, 
  className, 
  size = "md" 
}: TechBadgeProps) {
  const sizeClasses = {
    xs: "text-[10px] px-1.5 py-0.5",
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-1",
    lg: "text-base px-3 py-1.5",
  };

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        "bg-primary/5 text-primary hover:bg-primary/10 transition-all duration-200",
        "border border-primary/10 backdrop-blur-sm",
        "cursor-default shadow-sm",
        sizeClasses[size],
        className
      )}
    >
      {name}
    </motion.span>
  );
}
