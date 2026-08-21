import { useEffect, useMemo, useState, type KeyboardEvent } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Menu, Moon, Search, SlidersHorizontal, Sun, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/features/ThemeSlice";
import type { RootState } from "@/store/Store";

const componentLinks = [
  { label: "Button", path: "/components/button", type: "Component" },
  { label: "Card", path: "/components/card", type: "Component" },
  { label: "Modal", path: "/components/modal", type: "Component" },
  { label: "Input", path: "/components/input", type: "Component" },
  { label: "Navbar", path: "/components/navbar", type: "Component" },
  { label: "Carousel", path: "/components/carousel", type: "Component" },
  { label: "Tooltip", path: "/components/tooltip", type: "Component" },
  { label: "Layout", path: "/components/layout", type: "Component" },
  { label: "About", path: "/about", type: "Page" },
  { label: "Templates", path: "/templates", type: "Page" },
];

const filters = ["All", "Component", "Page"] as const;
type SearchFilter = (typeof filters)[number];

export default function HomeLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<SearchFilter>("All");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
    root.style.colorScheme = mode;
    localStorage.setItem("theme", mode);
  }, [mode]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileOpen);
    return () => document.body.classList.remove("menu-open");
  }, [mobileOpen]);

  const suggestions = useMemo(() => {
    const value = query.trim().toLowerCase();
    return componentLinks
      .filter((item) => filter === "All" || item.type === filter)
      .filter((item) => !value || item.label.toLowerCase().includes(value));
  }, [filter, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, filter]);

  const submitSearch = (value = query) => {
    const normalized = value.trim().toLowerCase();
    const pool = componentLinks.filter(
      (item) => filter === "All" || item.type === filter
    );

    if (!normalized) {
      navigate(filter === "Page" ? "/about" : "/components/button");
      setSearchFocused(false);
      return;
    }

    const exact = pool.find((item) => item.label.toLowerCase() === normalized);
    const partial = pool.find((item) => item.label.toLowerCase().includes(normalized));
    const target = exact ?? partial;

    if (target) {
      navigate(target.path);
      setQuery("");
      setSearchFocused(false);
    }
  };

  const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setSearchFocused(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((index) => Math.min(index + 1, suggestions.length - 1));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((index) => Math.max(index - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (suggestions[selectedIndex]) submitSearch(suggestions[selectedIndex].label);
      else submitSearch();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)]">
      <header className="site-header">
        <div className="site-header__left">
          <Link to="/" className="brand" aria-label="EaseUi home">
            EaseUi
          </Link>

          <div className="search-wrap">
            <Search size={20} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => window.setTimeout(() => setSearchFocused(false), 140)}
              onKeyDown={onSearchKeyDown}
              placeholder="Search components"
              aria-label="Search components"
              autoComplete="off"
            />

            {searchFocused && (
              <div className="search-results">
                <div className="search-filter-bar">
                  <SlidersHorizontal size={14} />
                  {filters.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={filter === item ? "is-active" : ""}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => setFilter(item)}
                    >
                      {item === "Component" ? "Components" : item}
                    </button>
                  ))}
                </div>

                {suggestions.length ? (
                  suggestions.map((item, index) => (
                    <button
                      key={item.path}
                      type="button"
                      className={index === selectedIndex ? "is-selected" : ""}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => submitSearch(item.label)}
                    >
                      <span>
                        <strong>{item.label}</strong>
                        <small>{item.type}</small>
                      </span>
                      <span>↵</span>
                    </button>
                  ))
                ) : (
                  <div className="search-empty">No matching {filter.toLowerCase()} found.</div>
                )}
              </div>
            )}
          </div>
        </div>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link
            className={location.pathname.startsWith("/components") ? "active" : ""}
            to="/components/button"
          >
            Components
          </Link>
          <Link className={location.pathname === "/about" ? "active" : ""} to="/about">
            About
          </Link>
          <Link
            className={location.pathname === "/templates" ? "active" : ""}
            to="/templates"
          >
            Templates
          </Link>
          <button
            type="button"
            className="theme-button"
            onClick={() => dispatch(toggleTheme())}
            aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          >
            {mode === "dark" ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </nav>

        <div className="mobile-actions">
          <button
            type="button"
            className="theme-button"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            {mode === "dark" ? <Sun size={21} /> : <Moon size={21} />}
          </button>
          <button
            type="button"
            className="theme-button mobile-menu-button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <>
          <button
            type="button"
            className="mobile-menu-backdrop"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />
          <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
            <Link to="/components/button" onClick={() => setMobileOpen(false)}>Components</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
            <Link to="/templates" onClick={() => setMobileOpen(false)}>Templates</Link>
          </nav>
        </>
      )}

      <main>
        <Outlet />
      </main>
    </div>
  );
}
