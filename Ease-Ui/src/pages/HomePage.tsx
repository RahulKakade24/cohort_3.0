import { Link } from "react-router";

const components = ["Button", "Card", "Modal", "Input", "Navbar", "Carousel", "Tooltip", "Layout"];

export default function HomePage() {
  return (
    <div className="page-container">
      <div className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
          React component library
        </p>
        <h1 className="page-title">Build interfaces with EaseUi.</h1>
        <p className="page-description mt-5">
          A clean collection of reusable React components with documentation,
          live previews, code snippets, routing, and light/dark mode.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/components/button"
            className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Browse components
          </Link>
          <Link
            to="/templates"
            className="rounded-lg border border-[var(--border-color)] px-5 py-3 font-semibold transition hover:bg-[var(--bg-card)]"
          >
            View templates
          </Link>
        </div>
      </div>

      <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {components.map((name) => (
          <Link
            key={name}
            to={`/components/${name.toLowerCase()}`}
            className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="font-semibold">{name}</span>
            <span className="mt-2 block text-sm text-[var(--text-muted)]">
              View documentation →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
