import { Outlet } from "react-router";
import { ErrorBoundary } from "./ErrorBoundary";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 w-full max-w-7xl mx-auto bg-white min-h-screen relative flex flex-col shadow-xl">
        <ErrorBoundary>
          <div className="flex-1 flex flex-col">
            <Outlet />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
}
