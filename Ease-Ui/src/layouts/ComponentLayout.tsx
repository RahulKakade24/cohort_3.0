import { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router";
import { Search, X } from "lucide-react";
import BackButton from "@/components/Personal/BackButton";

const components = [
  { label: "Button", path: "button" },
  { label: "Card", path: "card" },
  { label: "Modal", path: "modal" },
  { label: "Input", path: "input" },
  { label: "Navbar", path: "navbar" },
  { label: "Carousel", path: "carousel" },
  { label: "Tooltip", path: "tooltip" },
  { label: "Layout", path: "layout" },
];

export default function ComponentLayout() {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return components;
    return components.filter((item) => item.label.toLowerCase().includes(value));
  }, [query]);

  return (
    <div className="component-shell">
      <button
        className="mobile-sidebar-toggle"
        type="button"
        onClick={() => setMobileSidebarOpen(true)}
        aria-label="Open component menu"
      >
        <Search size={18} />
        Components
      </button>

      {mobileSidebarOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Close component menu"
        />
      )}

      <aside className={`component-sidebar ${mobileSidebarOpen ? "is-open" : ""}`}>
        <div className="sidebar-heading">
          <h2>Components</h2>
          <button
            type="button"
            className="sidebar-close"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="sidebar-search">
          <Search size={15} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter components..."
            aria-label="Filter components"
          />
          {query && (
            <button type="button" className="sidebar-clear" onClick={() => setQuery("")} aria-label="Clear component filter">
              <X size={14} />
            </button>
          )}
        </div>

        <nav className="component-nav" aria-label="Component navigation">
          {filtered.map((item) => (
            <NavLink
              key={item.path}
              to={`/components/${item.path}`}
              onClick={() => setMobileSidebarOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {item.label}
            </NavLink>
          ))}
          {!filtered.length && <span className="no-results">No components found</span>}
        </nav>
      </aside>

      <section className="component-content">
        <div className="component-content__inner">
          <BackButton />
          <Outlet />
        </div>
      </section>

      <div className="sr-only" aria-hidden="true">
        {location.pathname}
      </div>
    </div>
  );
}
