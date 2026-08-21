import React, { useId, useState } from "react";

export interface TooltipProps {
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = "top",
  children,
  delay = 80,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timer = React.useRef<number | null>(null);
  const tooltipId = useId();

  const show = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setIsVisible(true), delay);
  };

  const hide = () => {
    if (timer.current) window.clearTimeout(timer.current);
    setIsVisible(false);
  };

  const toggle = () => {
    setIsVisible((value) => !value);
  };

  return (
    <span
      className="tooltip-root"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span
        className="tooltip-trigger"
        tabIndex={0}
        aria-describedby={isVisible ? tooltipId : undefined}
        onClick={toggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggle();
          }
          if (event.key === "Escape") hide();
        }}
      >
        {children}
      </span>

      {isVisible && (
        <span
          id={tooltipId}
          role="tooltip"
          className={`tooltip-bubble tooltip-bubble--${position}`}
        >
          {content}
        </span>
      )}
    </span>
  );
};

export default Tooltip;
