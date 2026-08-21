// import React from "react";

// export interface LayoutProps {
//   header?: React.ReactNode;
//   sidebar?: React.ReactNode;
//   children: React.ReactNode;
//   footer?: React.ReactNode;
// }

// export const Layout: React.FC<LayoutProps> = ({
//   header,
//   sidebar,
//   children,
//   footer,
// }) => {
//   return (
//     <div className="flex flex-col min-h-[400px] w-full border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
//       {header && (
//         <header className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3">
//           {header}
//         </header>
//       )}

//       <div className="flex flex-1 overflow-hidden">
//         {sidebar && (
//           <aside className="w-48 border-r border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 p-4 hidden sm:block">
//             {sidebar}
//           </aside>
//         )}
//         <main className="flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-800">
//           {children}
//         </main>
//       </div>

//       {footer && (
//         <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3 text-xs text-gray-500">
//           {footer}
//         </footer>
//       )}
//     </div>
//   );
// };

// export default Layout;
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar"; // 👈 Default import matches your file
import { Button } from "@/components/Button/Button";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <Navbar>
        <div className="font-bold text-xl tracking-wide text-blue-600">DevEase UI</div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm font-medium hover:text-blue-600">Home</a>
          <a href="/docs" className="text-sm font-medium hover:text-blue-600">Components</a>
          <Button variant="outline" size="sm">GitHub</Button>
        </div>
      </Navbar>
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};
