// pages/_app.tsx
import type { AppProps } from "next/app";
import { AuthProvider } from "../contexts/AuthContext";
import { UIProvider } from "../contexts/UIContext";
import "../styles/globals.css";
import AuthModal from "@/components/AuthModal";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <UIProvider>
        <AuthModal />
        <Component {...pageProps} />
      </UIProvider>
    </AuthProvider>
  );
}

export default MyApp;
