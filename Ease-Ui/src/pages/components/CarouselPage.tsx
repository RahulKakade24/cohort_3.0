import ComponentDemo from "../ComponentsDemo";
import Carousel from "@/components/carousel/Carousel";
import PropsTable from "@/components/Personal/PropsTable";

const carouselCode = `import Carousel from "@/components/carousel/Carousel";

const slides = [
  <div>Slide 1: Welcome to EaseUi</div>,
  <div>Slide 2: Fully responsive components</div>,
  <div>Slide 3: Built for modern React apps</div>,
];

<Carousel
  items={slides}
  autoPlay
  interval={3500}
  loop
  pauseOnHover
  showArrows
  showDots
/>`;

const slides = [
  <div key="1" className="carousel-demo-slide">
    <span>01</span>
    <strong>Welcome to EaseUi</strong>
    <p>Reusable components with clean interactions.</p>
  </div>,
  <div key="2" className="carousel-demo-slide">
    <span>02</span>
    <strong>Responsive by default</strong>
    <p>Works across desktop, tablet and mobile screens.</p>
  </div>,
  <div key="3" className="carousel-demo-slide">
    <span>03</span>
    <strong>Interactive controls</strong>
    <p>Arrows, dots, autoplay, pause and touch swipe are included.</p>
  </div>,
];

const propsData = [
  { prop: "items", type: "React.ReactNode[]", default: "required", description: "Slides rendered by the carousel." },
  { prop: "autoPlay", type: "boolean", default: "true", description: "Automatically advances through slides." },
  { prop: "interval", type: "number", default: "3500", description: "Autoplay interval in milliseconds." },
  { prop: "loop", type: "boolean", default: "true", description: "Loops from the last slide to the first slide." },
  { prop: "showArrows", type: "boolean", default: "true", description: "Shows previous and next controls." },
  { prop: "showDots", type: "boolean", default: "true", description: "Shows clickable slide indicators." },
  { prop: "pauseOnHover", type: "boolean", default: "true", description: "Pauses autoplay while the pointer is over the carousel." },
];

export default function CarouselPage() {
  return (
    <div className="doc-page">
      <header className="doc-heading">
        <h1>Carousel</h1>
        <p>Responsive content slider with autoplay, keyboard controls, touch swipe and clickable indicators.</p>
      </header>

      <section className="doc-section">
        <h2>Usage</h2>
        <ComponentDemo code={carouselCode}>
          <div className="w-full max-w-2xl">
            <Carousel items={slides} />
          </div>
        </ComponentDemo>
      </section>

      <section className="doc-section">
        <h2>API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
}
