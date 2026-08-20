
import ComponentDemo from "../ComponentsDemo";
import Carousel from "@/components/carousel/Carousel";
import PropsTable from "@/components/Personal/PropsTable";

const CarouselPage: React.FC = () => {
  const carouselCode = `import React, { useState } from "react";

export const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      <div className="flex transition-transform duration-300" style={{ transform: \`translateX(-\${currentIndex * 100}%)\` }}>
        {items.map((item, idx) => <div key={idx} className="min-w-full p-8">{item}</div>)}
      </div>
    </div>
  );
};`;

  
  const propsData = [
    { prop: "items", type: "React.ReactNode[]", default: "required", description: "List of slides/elements to render inside the carousel." },
  ];

  const sampleSlides = [
    <div key="1" className="text-xl font-semibold">Slide 1: Welcome to the UI Library</div>,
    <div key="2" className="text-xl font-semibold">Slide 2: Fully customizable components</div>,
    <div key="3" className="text-xl font-semibold">Slide 3: Built with Tailwind CSS and React</div>,
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Carousel</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          A cycling slider component for displaying banners or items sequentially.
        </p>
      </div>

      <ComponentDemo code={carouselCode}>
        <div className="w-full max-w-md">
          <Carousel items={sampleSlides} />
        </div>
      </ComponentDemo>

      <div>
        <h2 className="text-xl font-semibold mb-4">Props</h2>
        <PropsTable data={propsData} />
      </div>
    </div>
  );
};

export default CarouselPage;CarouselPage;
