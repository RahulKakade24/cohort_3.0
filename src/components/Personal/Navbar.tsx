
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import Navbar from "@/components/navbar/Navbar";

export default function RootLayout() {
  const { mode } = useSelector((state: { theme: { mode: string } }) => state.theme);

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
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
