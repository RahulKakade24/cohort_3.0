

import { createBrowserRouter, RouterProvider } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import ComponentLayout from "../layouts/ComponentLayout";
import HomePage from "../HomePage";
import AboutPage from "@/About";       
import TemplatesPage from "../Templates"; 
import ButtonPage from "../pages/components/ButtonPage";
import CardPage from "@/pages/components/CardPage";
import ModalPage from "@/pages/components/ModalPage";
import InputPage from "@/pages/components/InputPage";
import NavbarPage from "@/pages/components/NavbarPage";
import TooltipPage from "@/pages/components/TooltipPage";
import CarouselPage from "@/pages/components/CarouselPage";
import LayoutPage from "@/pages/components/LayoutPage";

type Props = {};

const AppRouter = ({}: Props) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "templates",
          element: <TemplatesPage />,
        },
        {
          path: "components",
          element: <ComponentLayout />,
          children: [
            {
              path: "button",
              element: <ButtonPage />,
            },
            {
              path: "card",
              element: <CardPage />,
            },
            {
              path: "modal",
              element: <ModalPage />,
            },
            {
              path: "input",
              element: <InputPage />,
            },
            {
              path: "navbar",
              element: <NavbarPage />,
            },
            { 
              path: "tooltip", 
              element: <TooltipPage /> 
            },
            { 
              path: "carousel", 
              element: <CarouselPage /> 
            },
            { 
              path: "layout", 
              element: <LayoutPage /> 
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;

