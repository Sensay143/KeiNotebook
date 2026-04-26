import { useEffect, useState } from "react";
import { HomeScreen } from "./HomeScreen";
import { DesktopHomeScreen } from "./DesktopHomeScreen";

export function ResponsiveHome() {
  // Initialize based on current window size
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      const shouldBeDesktop = window.innerWidth >= 1024;
      setIsDesktop(shouldBeDesktop);
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop ? <DesktopHomeScreen /> : <HomeScreen />;
}
