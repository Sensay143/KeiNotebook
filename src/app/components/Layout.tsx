import { Outlet } from "react-router";
import { ErrorBoundary } from "./ErrorBoundary";

export function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <div className="flex-1 w-full relative flex flex-col">
        <ErrorBoundary>
          <div className="flex-1 flex flex-col w-full h-full">
            <Outlet />
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
}
