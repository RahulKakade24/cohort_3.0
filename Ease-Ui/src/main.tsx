import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import AppRouter from "./router/AppRouter";
import "./index.css";

const theme = store.getState().theme.mode;
document.documentElement.classList.toggle("dark", theme === "dark");
document.documentElement.style.colorScheme = theme;

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
