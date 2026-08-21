// // Navbar.tsx
// import { Slot } from "@radix-ui/react-slot";
// import React, { forwardRef, useEffect, useRef } from "react";
// import { cva, type VariantProps } from "class-variance-authority";
// import { cn } from "@/libs/utils";
// import { entranceAnimations } from "@/libs/animations/entranceAnimation";
// import { hoverAnimations } from "@/libs/animations/hoverAnimation";
// import gsap from "gsap";
// import { Button } from "../Button";

// const navbarVariants = cva(
//   `w-full flex items-center justify-between px-6 py-4 rounded-md border border-gray-200 transition-all`,
//   {
//     variants: {
//       variant: {
//         dark: "bg-slate-900 text-white",
//         light: "bg-white text-gray-800 shadow",
//         primary: "bg-indigo-600 text-white",
//         glass: "backdrop-blur-md bg-white/10 text-white border border-white/20",
//       },
//       size: {
//         default: "h-16",
//         sm: "h-12",
//         lg: "h-20",
//         xl: "h-24",
//       },
//     },
//     defaultVariants: {
//       variant: "light",
//       size: "default",
//     },
//   }
// );

// interface NavbarProps
//   extends React.HTMLAttributes<HTMLElement>,
//     VariantProps<typeof navbarVariants> {
//   asChild?: boolean;
//   animation?: keyof typeof entranceAnimations;
//   hoverAnimation?: keyof typeof hoverAnimations;
// }

// const Navbar = forwardRef<HTMLElement, NavbarProps>(
//   (
//     {
//       className,
//       variant,
//       size,
//       asChild = false,
//       animation = "fadeIn",
//       hoverAnimation = "none",
//       ...props
//     },
//     ref
//   ) => {
//     const Comp = asChild ? Slot : "nav";
//     const navbarRef = useRef<HTMLElement | null>(null);

//     useEffect(() => {
//       if (!navbarRef.current || animation === "none") return;
//       entranceAnimations[animation]?.(navbarRef.current);
//     }, [animation]);

//     const handleMouseEnter = () => {
//       hoverAnimations[hoverAnimation]?.(navbarRef.current!);
//     };

//     const handleMouseLeave = () => {
//       gsap.to(navbarRef.current, {
//         scale: 1,
//         rotation: 0,
//         y: 0,
//         duration: 0.1,
//       });
//     };

//     return (
//       <Comp
//         ref={(node) => {
//           navbarRef.current = node as HTMLElement;
//           if (typeof ref === "function") ref(node as HTMLElement);
//           else if (ref)
//             (ref as React.MutableRefObject<HTMLElement | null>).current = node;
//         }}
//         className={cn(navbarVariants({ variant, size }), className)}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         {...props}
//       >
//         <h1>Logo</h1>
//         <div className="flex gap-5">
//           <a href="">Home</a>
//           <a href="">About</a>
//           <a href="">Customer</a>
//         </div>
//         <div>
//           <Button hoverAnimation="none">Profile</Button>
//         </div>
//       </Comp>
//     );
//   }
// );

// Navbar.displayName = "Navbar";

// export { Navbar, navbarVariants };
/*import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/features/ThemeSlice";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border-color, #e5e7eb)] bg-[var(--bg-main, #ffffff)]/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          
          <div 
            onClick={() => handleNavClick("/")} 
            className="flex-shrink-0 font-bold text-xl text-[var(--text-main, #111827)] cursor-pointer"
          >
            MyBrand
          </div>


          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[var(--text-muted, #4b5563)] hover:text-[var(--text-main)] transition-colors font-medium">Home</Link>
            <Link to="/templates" className="text-[var(--text-muted, #4b5563)] hover:text-[var(--text-main)] transition-colors font-medium">Templates</Link>
            <Link to="/about" className="text-[var(--text-muted, #4b5563)] hover:text-[var(--text-main)] transition-colors font-medium">About</Link>
          </div>

        
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-lg bg-[var(--bg-card, #f9fafb)] border border-[var(--border-color, #e5e7eb)] text-[var(--text-main)] hover:opacity-80 transition-opacity"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

           
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
                className="p-2 rounded-lg text-[var(--text-main)] hover:bg-[var(--bg-card)] focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-main)] px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <button 
            onClick={() => handleNavClick("/")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[var(--text-main)] hover:bg-[var(--bg-card)]"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick("/templates")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[var(--text-main)] hover:bg-[var(--bg-card)]"
          >
            Templates
          </button>
          <button 
            onClick={() => handleNavClick("/about")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[var(--text-main)] hover:bg-[var(--bg-card)]"
          >
            About
          </button>
        </div>
      )}
    </nav>
  );
}*/

///

/*import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/features/ThemeSlice";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
         
          <div 
            onClick={() => handleNavClick("/")} 
            className="shrink-0 font-bold text-xl text-gray-900 dark:text-white cursor-pointer"
          >
            MyBrand
          </div>

           
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">Home</Link>
            <Link to="/templates" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">Templates</Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors font-medium">About</Link>
          </div>

          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:opacity-80 transition-opacity"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
                className="p-2 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <button 
            onClick={() => handleNavClick("/")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick("/templates")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Templates
          </button>
          <button 
            onClick={() => handleNavClick("/about")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            About
          </button>
        </div>
      )}
    </nav>
  );
}*/



/*import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/ThemeSlice";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useSelector((state: any) => state.theme.theme);
  const navigate = useNavigate();

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-main)]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
         
          <div 
            onClick={() => handleNavClick("/")} 
            className="font-bold text-xl text-[var(--text-main)] cursor-pointer"
          >
            MyBrand
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-medium">Home</Link>
            <Link to="/templates" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-medium">Templates</Link>
            <Link to="/about" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-medium">About</Link>
          </div>

         
          <div className="flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle Dark Mode"
              className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-main)] hover:opacity-80 transition-opacity"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

           
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
                className="p-2 rounded-lg text-[var(--text-main)] hover:bg-[var(--bg-card)] focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden border-b border-[var(--border-color)] bg-[var(--bg-main)] px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <button 
            onClick={() => handleNavClick("/")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[var(--text-main)] hover:bg-[var(--bg-card)]"
          >
            Home
          </button>
          <button 
            onClick={() => handleNavClick("/templates")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[var(--text-main)] hover:bg-[var(--bg-card)]"
          >
            Templates
          </button>
          <button 
            onClick={() => handleNavClick("/about")}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[var(--text-main)] hover:bg-[var(--bg-card)]"
          >
            About
          </button>
        </div>
      )}
    </nav>
  );
}*/
///
/*import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[var(--bg-card)] border-b border-[var(--border-color)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
           
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-[var(--text-main)]">
              AppLogo
            </Link>
          </div>

          
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-medium text-sm"
            >
              Home
            </Link>
            <Link
              to="/templates"
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-medium text-sm"
            >
              Templates
            </Link>
            <Link
              to="/about"
              className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors font-medium text-sm"
            >
              About
            </Link>
          </div>

          
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)] focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

    
      {isOpen && (
        <div className="md:hidden bg-[var(--bg-card)] border-b border-[var(--border-color)] px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/templates"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)] transition-colors"
          >
            Templates
          </Link>
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)] transition-colors"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}*/
/*import { Link } from "react-router"; // Use "react-router-dom" if that is what your project uses
 import { useState } from "react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav>
      

      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--bg-card)] border-b border-[var(--border-color)] px-4 pt-2 pb-4 space-y-2 md:hidden shadow-lg">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)]"
          >
            Components
          </Link>

         
          <Link
            to="/about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)]"
          >
            About
          </Link>
          
          <Link
            to="/templates"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-main)]"
          >
            Templates
          </Link>
        </div>
      )}
    </nav>
  );
}*/
import React, { useState } from "react";
import { toggleTheme } from "@/features/ThemeSlice";
import { Moon, Search, Sun, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { mode } = useSelector(
    (state: { theme: { mode: string } }) => state.theme
  );

  return (
    <nav className="relative h-16 w-full flex items-center justify-between px-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-50">
      <div className="flex items-center gap-10">
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-2xl cursor-pointer text-gray-900 dark:text-white"
        >
          EaseUi
        </h1>

        <div className="hidden sm:flex items-center bg-transparent rounded-md px-3 py-1.5 shadow-xs shadow-gray-300 border border-gray-200 dark:border-gray-700">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search components"
            className="ml-2 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 text-gray-500 dark:text-gray-300">
        <li
          onClick={() => navigate("/components/button")}
          className="cursor-pointer hover:text-black dark:hover:text-white"
        >
          Components
        </li>
        <li
          onClick={() => navigate("/about")}
          className="cursor-pointer hover:text-black dark:hover:text-white"
        >
          About
        </li>
        <li
          onClick={() => navigate("/templates")}
          className="cursor-pointer hover:text-black dark:hover:text-white"
        >
          Templates
        </li>
        
        {/* Theme Toggler */}
        {mode === "dark" && (
          <li
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => dispatch(toggleTheme())}
          >
            <Sun size={20} className="text-yellow-400" />
          </li>
        )}
        {mode === "light" && (
          <li
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => dispatch(toggleTheme())}
          >
            <Moon size={20} className="text-gray-600 dark:text-gray-400" />
          </li>
        )}
      </ul>

      {/* Mobile Right Section (Theme Toggle + Hamburger) */}
      <div className="flex items-center gap-3 md:hidden">
        {mode === "dark" ? (
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => dispatch(toggleTheme())}
          >
            <Sun size={18} className="text-yellow-400" />
          </button>
        ) : (
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => dispatch(toggleTheme())}
          >
            <Moon size={18} className="text-gray-600 dark:text-gray-400" />
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-700 dark:text-gray-200 p-1 focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-md py-4 px-6 flex flex-col gap-4 md:hidden text-sm">
          <div
            onClick={() => {
              navigate("/components/button");
              setIsOpen(false);
            }}
            className="cursor-pointer text-gray-700 dark:text-gray-200 font-medium hover:text-black dark:hover:text-white"
          >
            Components
          </div>
          <div
            onClick={() => {
              navigate("/about");
              setIsOpen(false);
            }}
            className="cursor-pointer text-gray-700 dark:text-gray-200 font-medium hover:text-black dark:hover:text-white"
          >
            About
          </div>
          <div
            onClick={() => {
              navigate("/templates");
              setIsOpen(false);
            }}
            className="cursor-pointer text-gray-700 dark:text-gray-200 font-medium hover:text-black dark:hover:text-white"
          >
            Templates
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
