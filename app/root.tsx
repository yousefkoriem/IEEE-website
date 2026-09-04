import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import type { Route } from "./+types/root";
import Navbar from "./components/Navbar";
import { InactiveBanner } from "./components/InactiveBanner";
import { Chatbot } from "./components/Chatbot";
import { store } from "./store/store";
import { useNavigationInit } from "./hooks/useNavigationInit";
import "./index.css";
import "./app.css";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "~/config/queryClient";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { IntroProvider } from "./context/IntroContext";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="bjWRueaSb0NUx7YL47Lpg31YWHEfO5o4LyV3mZlyfOg"
        />
        <Meta />
        <Links />
      </head>
      <body suppressHydrationWarning>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function AppShell() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/dashboard");
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";
  const hideNavbar = isDashboardRoute || isAuthRoute;

  return (
    <>
      {!hideNavbar && <Navbar />}
      <InactiveBanner />
      <Outlet />
      {!isAuthRoute && <Chatbot />}
    </>
  );
}

export default function App() {
  // Initialize navigation service
  useNavigationInit();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <IntroProvider>
          <AppShell />
        </IntroProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "var(--toast-bg, #363636)",
              color: "var(--toast-color, #fff)",
            },
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </Provider>
    </QueryClientProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
