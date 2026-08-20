
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Menu, Search } from "lucide-react";

type Props = {};

const ComponentLayout = ({}: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const components = [
    "Button",
    "Card",
    "Modal",
    "Input",
    "Navbar",
    "Carousel",
    "Tooltip",
    "Layout",
  ];

 
  const filteredComponents = components.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen text-gray-900 bg-white dark:bg-gray-950">
     
      <aside
        className={`
          w-64 p-6 flex flex-col shrink-0
          border-r border-gray-200 dark:border-gray-800
          fixed md:static top-0 left-0 h-full z-20
          bg-white dark:bg-gray-950
          transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out
          md:translate-x-0
        `}
      >
        <h2 className="text-md font-bold mb-4 text-gray-900 dark:text-gray-100">Components</h2>
      
        
        <div className="flex items-center rounded-md px-3 py-1.5 border border-gray-200 dark:border-gray-700 mb-6 bg-gray-50 dark:bg-gray-900">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="ml-2 bg-transparent outline-none text-xs text-gray-700 dark:text-gray-200 placeholder-gray-400 w-full"
          />
        </div>

      
        <ul className="flex flex-col gap-2 overflow-y-auto">
          {filteredComponents.length > 0 ? (
            filteredComponents.map((item) => (
              <li
                onClick={() => {
                  navigate(item.toLowerCase());
                  setSidebarOpen(false); 
                }}
                key={item}
                className={`cursor-pointer text-md transition-all duration-200 ease-in-out ${
                  location.pathname === `/components/${item.toLowerCase()}`
                    ? "text-black dark:text-white font-semibold translate-x-1"
                    : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:translate-x-1"
                }`}
              >
                {item}
              </li>
            ))
          ) : (
            <li className="text-xs text-gray-400 italic">No components found</li>
          )}
        </ul>
      </aside>

     
      <div className="flex-1 overflow-auto h-screen p-6 md:p-10">
        <button
          className="md:hidden mb-4 p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu size={20} />
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default ComponentLayout;
