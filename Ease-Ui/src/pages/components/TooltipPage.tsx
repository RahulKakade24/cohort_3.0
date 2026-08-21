import ComponentDemo from "../ComponentsDemo";
import Tooltip from "@/components/tooltip/Tooltip";
import PropsTable from "@/components/Personal/PropsTable";

const tooltipCode = `import Tooltip from "@/components/tooltip/Tooltip";

<Tooltip content="Helpful information" position="top">
  <button>Hover or focus me</button>
</Tooltip>`;

const propsData = [
  { prop: "content", type: "React.ReactNode", default: "required", description: "Content displayed inside the tooltip." },
  { prop: "position", type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: "Placement relative to the trigger." },
  { prop: "delay", type: "number", default: "80", description: "Delay before the tooltip opens, in milliseconds." },
];

export default function TooltipPage() {
  return (
    <div className="doc-page">
      <header className="doc-heading">
        <h1>Tooltip</h1>
        <p>Helpful contextual information that works with mouse, keyboard focus and touch/click interaction.</p>
      </header>

      <section className="doc-section">
        <h2>Usage</h2>
        <ComponentDemo code={tooltipCode}>
          <div className="tooltip-demo-grid">
            <Tooltip content="Tooltip above the button" position="top">
              <button className="demo-action-button">Top</button>
            </Tooltip>
            <Tooltip content="Tooltip below the button" position="bottom">
              <button className="demo-action-button">Bottom</button>
            </Tooltip>
            <Tooltip content="Tooltip to the left" position="left">
              <button className="demo-action-button">Left</button>
            </Tooltip>
            <Tooltip content="Tooltip to the right" position="right">
              <button className="demo-action-button">Right</button>
            </Tooltip>
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
