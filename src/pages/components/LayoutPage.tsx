
import React, { useState } from "react";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Menu, Home, Layers, Settings, Bell, ChevronRight,  } from "lucide-react";

const LayoutPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const layoutCode = `import React, { useState } from "react";
import { Menu, Home, Layers, Settings, Bell, ChevronRight, User } from "lucide-react";

export const AdvancedDashboardLayout = ({ children, title = "Dashboard" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      {/* Top Navigation Header */}
      <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <Menu size={20} />
          </button>
          <span className="font-bold text-xl tracking-tight bg-linear-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
            EaseUi Pro
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 relative">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-sm border border-indigo-200 dark:border-indigo-800">
            U
          </div>
        </div>
      </header>

      {/* Main Body Grid Structure */}
      <div className="flex flex-1 overflow-hidden">
        {/* Collapsible Sidebar */}
        <aside className={\`transition-all duration-300 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 \${sidebarOpen ? "w-64" : "w-16"}\`}>
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-200">
              <Home size={20} />
              {sidebarOpen && <span className="text-sm font-medium">Home</span>}
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 cursor-pointer">
              <Layers size={20} />
              {sidebarOpen && <span className="text-sm font-medium">Components</span>}
            </div>
            <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-gray-700 dark:text-gray-200">
              <Settings size={20} />
              {sidebarOpen && <span className="text-sm font-medium">Settings</span>}
            </div>
          </div>
        </aside>

        {/* Dynamic Content Region */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          {/* Breadcrumb Header */}
          <div className="bg-white dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800 px-8 py-3 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <span>Dashboard</span>
            <ChevronRight size={14} />
            <span className="text-gray-900 dark:text-gray-100 font-medium">{title}</span>
          </div>

          <div className="p-8 flex-1">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};`;

  const propsData = [
    { 
      prop: "children", 
      type: "React.ReactNode", 
      default: "required", 
      description: "Primary content injected into the central viewing window." 
    },
    { 
      prop: "title", 
      type: "string", 
      default: "\"Dashboard\"", 
      description: "Breadcrumb title header representing the active screen context." 
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Advanced Dashboard Layout</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          An enterprise-grade layout framework featuring a toggleable collapsible sidebar, sticky top header, breadcrumb navigation, and responsive container structure.
        </p>
      </div>

      <ComponentDemo code={layoutCode}>
        <div className="w-full border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm flex flex-col">
          {/* Miniature Interactive Preview Header */}
          <header className="h-14 border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                <Menu size={16} />
              </button>
              <span className="font-bold text-sm bg-linear-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                EaseUi Pro
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 relative">
                <Bell size={14} />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
              </span>
              <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                U
              </div>
            </div>
          </header>

          <div className="flex h-56">
         
            <div className={`transition-all duration-300 bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-2 space-y-1 ${sidebarOpen ? "w-36" : "w-12"}`}>
              <div className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-xs text-gray-600 dark:text-gray-300">
                <Home size={14} />
                {sidebarOpen && <span>Home</span>}
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                <Layers size={14} />
                {sidebarOpen && <span>Components</span>}
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-800 text-xs text-gray-600 dark:text-gray-300">
                <Settings size={14} />
                {sidebarOpen && <span>Settings</span>}
              </div>
            </div>

         
            <div className="flex-1 flex flex-col bg-gray-50/50 dark:bg-gray-900/50">
              <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-1.5 flex items-center gap-1.5 text-[10px] text-gray-400">
                <span>Dashboard</span>
                <ChevronRight size={10} />
                <span className="text-gray-700 dark:text-gray-200 font-medium">Components</span>
              </div>
              <div className="flex-1 flex items-center justify-center p-6 text-xs text-gray-400 dark:text-gray-500">
                 Layout Content Area
              </div>
            </div>
          </div>
        </div>
      </ComponentDemo>

      <div>
        <h2 className="text-xl font-semibold mb-4">Props</h2>
        <PropsTable data={propsData} />
      </div>
    </div>
  );
};

export default LayoutPage;
