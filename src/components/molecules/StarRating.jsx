import { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StarRating = ({ 
  rating = 0, 
  maxRating = 10, 
  onRatingChange,
  size = "md",
  readonly = false,
  showValue = true,
  className = ""
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizes = {
    sm: 16,
    md: 20,
    lg: 24,
    xl: 28
  };
  
  const iconSize = sizes[size];
  
  const getStarColor = (index) => {
    const currentRating = hoverRating || rating;
    if (index <= currentRating) {
      return "text-secondary-500";
    }
    return "text-gray-300";
  };
  
  const handleStarClick = (index) => {
    if (!readonly && onRatingChange) {
      onRatingChange(index);
    }
  };
  
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-1">
        {[...Array(maxRating)].map((_, index) => {
          const starIndex = index + 1;
          return (
            <button
              key={starIndex}
              type="button"
              disabled={readonly}
              onClick={() => handleStarClick(starIndex)}
              onMouseEnter={() => !readonly && setHoverRating(starIndex)}
              onMouseLeave={() => !readonly && setHoverRating(0)}
              className={cn(
                "transition-colors duration-200",
                !readonly && "hover:scale-110 cursor-pointer",
                readonly && "cursor-default"
              )}
            >
              <ApperIcon 
                name="Star" 
                size={iconSize} 
                className={cn(
                  "transition-colors duration-200",
                  getStarColor(starIndex)
                )}
                fill={starIndex <= (hoverRating || rating) ? "currentColor" : "none"}
              />
            </button>
          );
        })}
      </div>
      
      {showValue && (
        <span className="text-sm font-semibold text-gray-700">
          {rating.toFixed(1)}/{maxRating}
        </span>
      )}
    </div>
  );
};

export default StarRating;