
import React, { useState } from "react";

export interface TooltipProps {
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "top",
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded shadow-md whitespace-nowrap pointer-events-none transition-opacity duration-200 animate-fadeIn ${positionClasses[position]}`}
        >
          {content}
          <div className="absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
