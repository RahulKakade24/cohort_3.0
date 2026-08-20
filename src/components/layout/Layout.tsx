
import  { useState } from "react";
import { Outlet, Link } from "react-router";

export default function HomeLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-(--bg-main) text-(--text-main) flex flex-col">
    
      <header className="border-b border-(--border-color) bg-(--bg-card) px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <Link to="/" className="text-xl font-bold tracking-tight text-(--text-main)">
          EaseUi
        </Link>

     
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-(--text-muted)">
          <Link to="/" className="`hover:text-(--text-main)` transition-colors">Components</Link>
          <Link to="/about" className="`hover:text-(--text-main)` transition-colors">About</Link>
          <Link to="/templates" className="`hover:text-(--text-main)`transition-colors">Templates</Link>
        </nav>

      
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-lg `text-(--text-muted)` `hover:text-(--text-main)`"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

    
        {isOpen && (
          <div className="absolute top-full left-0 right-0 `bg-(--bg-card)`border-b `border-(--border-color)` px-4 pt-2 pb-4 space-y-2 md:hidden shadow-lg">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium `text-(--text-muted)` `hover:text-(--text-main)` `hover:bg-(--bg-main)`"
            >
              Components
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium `text-(--text-muted)` `hover:text-(--text-main)` `hover:bg-(--bg-main)`"
            >
              About
            </Link>
            <Link
              to="/templates"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-2 rounded-md text-base font-medium `text-(--text-muted)` `hover:text-(--text-main)` `hover:bg-(--bg-main)`"
            >
              Templates
            </Link>
          </div>
        )}
      </header>

     
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
