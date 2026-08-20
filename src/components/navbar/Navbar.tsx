
import { Link } from "react-router";  
import { useState } from "react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
     

    
      {isOpen && (
        <div className="absolute top-full left-0 right-0 `bg-(--bg-card)`border-b `border-(--border-color)` px-4 pt-2 pb-4 space-y-2 md:hidden shadow-lg">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium `text-(--text-muted)` `hover:text-(--text-main)``hover:bg-(--bg-main)`"
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
            className="block px-3 py-2 rounded-md text-base font-medium `text-(--text-muted)`  `hover:text-(--text-main)` `hover:bg-(--bg-main)`"
          >
            Templates
          </Link>
        </div>
      )}
    </nav>
  );
}
