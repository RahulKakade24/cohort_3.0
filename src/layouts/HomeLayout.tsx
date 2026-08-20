

import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { Moon, Sun } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "@/features/ThemeSlice";

export default function RootLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { mode } = useSelector(
    (state: { theme: { mode: string } }) => state.theme
  );

  
  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [mode]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <header className="h-16 border-b border-gray-200 dark:border-slate-800 px-8 flex items-center justify-between sticky top-0 z-30 bg-white dark:bg-slate-900/90 backdrop-blur-md">
        <div className="flex items-center gap-10">
          <h1 
            onClick={() => navigate("/")} 
            className="font-bold text-xl cursor-pointer text-gray-900 dark:text-white"
          >
            EaseUi
          </h1>
        </div>

        <ul className="flex items-center gap-8 text-sm text-gray-500 dark:text-gray-300 font-medium">
          <li 
            onClick={() => navigate("/components/button")} 
            className="cursor-pointer hover:text-black dark:hover:text-white transition-colors"
          >
            Components
          </li>
          <li 
            onClick={() => navigate("/about")} 
            className="cursor-pointer hover:text-black dark:hover:text-white transition-colors"
          >
            About
          </li>
          <li 
            onClick={() => navigate("/templates")} 
            className="cursor-pointer hover:text-black dark:hover:text-white transition-colors"
          >
            Templates
          </li>

         
          <button 
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 transition-colors"
            aria-label="Toggle Theme"
          >
            {mode === "dark" ? (
              <Sun size={18} className="text-yellow-400" />
            ) : (
              <Moon size={18} />
            )}
          </button>
        </ul>
      </header>

      <main className="flex-1 bg-gray-50/50 dark:bg-slate-950/50">
        <Outlet />
      </main>
    </div>
  );
}
