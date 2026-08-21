// import { Navbar } from "@/components/navbar";
// import ComponentDemo from "../ComponentsDemo";

// const NavbarPage = () => {
//   const usageCode = `import ComponentDemo from "../ComponentsDemo";
//       <Navbar />


//   `;

//   return (
//     <div>
//       <ComponentDemo code={usageCode}>
//         <Navbar />
//       </ComponentDemo>
//     </div>
//   );
// };

// export default NavbarPage;
import React from "react";
import ComponentDemo from "../ComponentsDemo";
import Navbar from "@/components/navbar/Navbar";
import PropsTable from "@/components/Personal/PropsTable";

const NavbarPage: React.FC = () => {
  const navbarCode = `import React from "react";

export const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="font-bold text-lg">BrandLogo</div>
      <div className="flex gap-6 text-sm">
        <a href="#" className="hover:text-blue-500">Home</a>
        <a href="#" className="hover:text-blue-500">Components</a>
        <a href="#" className="hover:text-blue-500">About</a>
      </div>
    </nav>
  );
};`;

  // Changed the key from 'name' to 'prop' to match PropsTable expectations
  const propsData = [
    { prop: "brandName", type: "string", default: '"Logo"', description: "The title or logo text displayed on the left." },
    { prop: "links", type: "{ label: string; href: string }[]", default: "[]", description: "Array of navigation links." },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Navbar</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          A responsive navigation bar component for site headers.
        </p>
      </div>

      <ComponentDemo code={navbarCode}>
        <Navbar />
      </ComponentDemo>

      <div>
        <h2 className="text-xl font-semibold mb-4">Props</h2>
        {/* Passing the corrected array structure to the 'data' prop */}
        <PropsTable data={propsData} />
      </div>
    </div>
  );
};

export default NavbarPage;

