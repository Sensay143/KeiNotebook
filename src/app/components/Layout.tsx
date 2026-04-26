import { Outlet, useLocation } from "react-router";
import { ErrorBoundary } from "./ErrorBoundary";

export function Layout() {
  const location = useLocation();
  const isDesktopRoute = location.pathname === "/home" || location.pathname === "/";
  const isAdaptiveRoute =
    location.pathname.startsWith("/create") ||
    location.pathname.startsWith("/your-notebook") ||
    location.pathname.startsWith("/profile");
  const isFullWidth = location.pathname.startsWith("/community") || isDesktopRoute || isAdaptiveRoute;

  return (
    <div className={`min-h-screen ${isDesktopRoute ? "bg-white" : "bg-gradient-to-br from-blue-50 via-green-50 to-blue-50"}`}>
      <div className={`${isFullWidth ? "w-full" : "max-w-md mx-auto bg-white"} min-h-screen ${isFullWidth ? "" : "shadow-2xl"}`}>
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </div>
    </div>
  );
}
