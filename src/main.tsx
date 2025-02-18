import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ui/theme-provider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/index.ts";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <GoogleOAuthProvider clientId={CLIENTID}>
          <Toaster richColors position="top-center" closeButton />
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
