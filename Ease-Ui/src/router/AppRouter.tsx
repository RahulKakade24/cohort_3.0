import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import HomeLayout from "@/layouts/HomeLayout";
import ComponentLayout from "@/layouts/ComponentLayout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/About";
import TemplatesPage from "@/pages/Templates";
import ButtonPage from "@/pages/components/ButtonPage";
import CardPage from "@/pages/components/CardPage";
import ModalPage from "@/pages/components/ModalPage";
import InputPage from "@/pages/components/InputPage";
import NavbarPage from "@/pages/components/NavbarPage";
import TooltipPage from "@/pages/components/TooltipPage";
import CarouselPage from "@/pages/components/CarouselPage";
import LayoutPage from "@/pages/components/LayoutPage";

function NotFound() {
  return (
    <div className="page-container">
      <h1 className="page-title">Page not found</h1>
      <p className="page-description">The page you requested does not exist.</p>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "templates", element: <TemplatesPage /> },
      {
        path: "components",
        element: <ComponentLayout />,
        children: [
          { index: true, element: <Navigate to="button" replace /> },
          { path: "button", element: <ButtonPage /> },
          { path: "card", element: <CardPage /> },
          { path: "modal", element: <ModalPage /> },
          { path: "input", element: <InputPage /> },
          { path: "navbar", element: <NavbarPage /> },
          { path: "carousel", element: <CarouselPage /> },
          { path: "tooltip", element: <TooltipPage /> },
          { path: "layout", element: <LayoutPage /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
