import React, { useState } from "react";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Search } from "lucide-react";

const NavbarPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navbarCode = `import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative h-16 w-full flex items-center justify-between px-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center gap-10">
        <h1 onClick={() => navigate("/")} className="font-bold text-2xl cursor-pointer text-gray-900 dark:text-white">
          EaseUi
        </h1>
        <div className="hidden sm:flex items-center rounded-md px-3 py-1.5 border border-gray-200 dark:border-gray-700">
          <Search size={18} className="text-gray-500" />
          <input type="text" placeholder="Search components" className="ml-2 bg-transparent outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400" />
        </div>
      </div>

      <ul className="hidden md:flex items-center gap-6 text-gray-500 dark:text-gray-300">
        <li onClick={() => navigate("/components/button")} className="cursor-pointer hover:text-black dark:hover:text-white">Components</li>
        <li onClick={() => navigate("/about")} className="cursor-pointer hover:text-black dark:hover:text-white">About</li>
        <li onClick={() => navigate("/templates")} className="cursor-pointer hover:text-black dark:hover:text-white">Templates</li>
      </ul>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 dark:text-gray-200 p-2">
        {isOpen ? "✕" : "☰"}
      </button>
    </nav>
  );
};`;

  const propsData = [
    { 
      prop: "brandName", 
      type: "string", 
      default: "''EaseUi''", 
      description: "The title or logo text displayed on the left side of the navbar." 
    },
    { 
      prop: "links", 
      type: "Array<{ label: string, path: string }>", 
      default: "[]", 
      description: "List of navigation routing links displayed in both desktop and mobile views." 
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Navbar</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          A responsive navigation bar featuring search, navigation routing links, and a mobile hamburger menu.
        </p>
      </div>

      <ComponentDemo code={navbarCode}>
        <div className="w-full border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-900">
          <nav className="relative h-16 w-full flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-6">
              <span className="font-bold text-xl text-gray-900 dark:text-white cursor-pointer">
                EaseUi
              </span>
              <div className="hidden sm:flex items-center rounded-md px-3 py-1 border border-gray-200 dark:border-gray-700">
                <Search size={16} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search components"
                  readOnly
                  className="ml-2 bg-transparent outline-none text-xs text-gray-700 dark:text-gray-200 placeholder-gray-400 w-32"
                />
              </div>
            </div>

            <ul className="hidden md:flex items-center gap-6 text-sm text-gray-500 dark:text-gray-300 font-medium">
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Components</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">About</li>
              <li className="hover:text-black dark:hover:text-white cursor-pointer">Templates</li>
            </ul>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 dark:text-gray-200 p-1 focus:outline-none"
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </nav>

          {mobileMenuOpen && (
            <div className="px-6 py-3 space-y-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 md:hidden text-sm">
              <div className="font-medium text-gray-700 dark:text-gray-200">Components</div>
              <div className="font-medium text-gray-700 dark:text-gray-200">About</div>
              <div className="font-medium text-gray-700 dark:text-gray-200">Templates</div>
            </div>
          )}
        </div>
      </ComponentDemo>

      <div>
        <h2 className="text-xl font-semibold mb-4">Props</h2>
        <PropsTable data={propsData} />
      </div>
    </div>
  );
};

export default NavbarPage;
