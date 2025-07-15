import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  className, 
  variant = "default", 
  hover = false,
  children, 
  ...props 
}, ref) => {
  const baseClasses = "bg-white rounded-xl shadow-card border border-gray-100";
  
  const variants = {
    default: "p-6",
    compact: "p-4",
    spacious: "p-8"
  };
  
  const hoverClasses = hover ? "card-hover cursor-pointer" : "";
  
  return (
    <div
      ref={ref}
      className={cn(
        baseClasses,
        variants[variant],
        hoverClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;