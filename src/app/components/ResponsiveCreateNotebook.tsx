import { useEffect, useState } from "react";
import { CreateNotebookScreen } from "./CreateNotebookScreen";
import { useNavigate } from "react-router";
import { ChevronLeft, Edit, Upload, Layers } from "lucide-react";

function DesktopCreateNotebook() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 max-w-4xl mx-auto p-12">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Create Notebook</h1>
          <p className="text-gray-600">Choose what type of content you'd like to create</p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <button
            onClick={() => navigate("/create-quiz")}
            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Edit className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Create Quiz</h3>
            <p className="text-sm text-gray-600">Multiple choice, identification, or essay questions</p>
          </button>

          <button
            onClick={() => navigate("/create-study-material")}
            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-10 h-10 text-purple-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Study Material</h3>
            <p className="text-sm text-gray-600">Flashcards, notes, and study guides</p>
          </button>

          <button
            onClick={() => navigate("/upload-material")}
            className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all group"
          >
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Upload File</h3>
            <p className="text-sm text-gray-600">Upload PDF or presentation and convert</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export function ResponsiveCreateNotebook() {
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

  return isDesktop ? <DesktopCreateNotebook /> : <CreateNotebookScreen />;
}
