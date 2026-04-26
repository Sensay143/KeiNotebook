import { useEffect, useState } from "react";
import { CreateStudyMaterialScreen } from "./CreateStudyMaterialScreen";

export function ResponsiveCreateStudyMaterial() {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={isDesktop ? "bg-gray-50" : ""}>
      <CreateStudyMaterialScreen />
    </div>
  );
}
