import { Button } from "@/components/Button/Button";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const propsData = [
  {
    prop: "variant",
    type: '"primary" | "secondary" | "outline" | "destructive" | "ghost" | "dark" | "ok" | "link"',
    default: '"primary"',
    description: "Controls the button's visual style.",
  },
  {
    prop: "size",
    type: '"sm" | "lg" | "xl" | "icon" | "full" | "auto"',
    default: '"default"',
    description: "Controls button dimensions and spacing.",
  },
  {
    prop: "animation",
    type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
    default: '"none"',
    description: "Optional entrance animation when the button mounts.",
  },
  {
    prop: "hoverAnimation",
    type: '"jiggle" | "scale" | "bounce" | "none"',
    default: '"none"',
    description: "Optional GSAP hover interaction.",
  },
];

const basicUsageCode = `import { Button } from "@/components/Button/Button";

<Button variant="primary" hoverAnimation="jiggle" size="sm">
  Jiggle
</Button>

<Button variant="secondary" hoverAnimation="bounce" size="lg">
  Bounce
</Button>

<Button variant="outline" hoverAnimation="scale" size="xl">
  Scale
</Button>

<Button variant="dark" size="sm">
  Dark
</Button>`;

export default function ButtonPage() {
  return (
    <div className="doc-page">
      <header className="doc-heading">
        <h1>Button</h1>
        <p>Displays a button or a component that looks like a button.</p>
      </header>

      <section className="doc-section">
        <h2>Usage</h2>

        <ComponentDemo code={basicUsageCode}>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <Button variant="primary" hoverAnimation="jiggle" size="sm">
              Jiggle
            </Button>
            <Button variant="secondary" hoverAnimation="bounce" size="lg">
              Bounce
            </Button>
            <Button variant="outline" hoverAnimation="scale" size="xl">
              Scale
            </Button>
            <Button variant="dark" size="sm">
              Dark
            </Button>
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
