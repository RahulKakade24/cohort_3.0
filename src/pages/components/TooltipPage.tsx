
import React from "react";
import ComponentDemo from "../ComponentsDemo";
import Tooltip from "@/components/tooltip/Tooltip";
import PropsTable from "@/components/Personal/PropsTable";

const TooltipPage: React.FC = () => {
  const tooltipCode = `import React, { useState } from "react";

export const Tooltip = ({ content, position = "top", children }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="relative inline-flex" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <div className="absolute z-50 px-3 py-1.5 text-xs text-white bg-gray-900 rounded shadow">
          {content}
        </div>
      )}
    </div>
  );
};`;

  
  const propsData = [
    { prop: "content", type: "React.ReactNode", default: "required", description: "Text or elements displayed inside the tooltip popover." },
    { prop: "position", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Placement direction relative to the target element." },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tooltip</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Displays informative text when users hover or focus on an element.
        </p>
      </div>

      <ComponentDemo code={tooltipCode}>
        <Tooltip content="This is a helpful tooltip!">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Hover over me
          </button>
        </Tooltip>
      </ComponentDemo>

      <div>
        <h2 className="text-xl font-semibold mb-4">Props</h2>
     
        <PropsTable data={propsData} />
      </div>
    </div>
  );
};

export default TooltipPage;
