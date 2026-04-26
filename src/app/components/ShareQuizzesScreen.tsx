import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Share2, CheckCircle2, FileText } from "lucide-react";

export function ShareQuizzesScreen() {
  const navigate = useNavigate();
  const [selectedQuizzes, setSelectedQuizzes] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"created" | "downloaded" | "phone">("created");

  const createdQuizzes = [
    { id: "c1", title: "Algebra Fundamentals", subject: "Math", questions: 10 },
    { id: "c2", title: "Spanish Basics", subject: "Languages", questions: 15 },
  ];

  const downloadedQuizzes = [
    { id: "d1", title: "Physics: Motion & Forces", subject: "Science", questions: 12 },
    { id: "d2", title: "World War II Events", subject: "History", questions: 20 },
  ];

  const phoneFiles = [
    { id: "p1", title: "Biology Notes.pdf", type: "PDF", size: "2.3 MB" },
    { id: "p2", title: "Chemistry Presentation.pptx", type: "Presentation", size: "5.1 MB" },
  ];

  const toggleQuiz = (id: string) => {
    setSelectedQuizzes(prev =>
      prev.includes(id) ? prev.filter(qid => qid !== id) : [...prev, id]
    );
  };

  const getCurrentList = () => {
    switch (activeTab) {
      case "created": return createdQuizzes;
      case "downloaded": return downloadedQuizzes;
      case "phone": return phoneFiles;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-green-400 p-4 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/home")} className="p-2 hover:bg-white/20 rounded-full">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl text-white">Share Quizzes</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("created")}
            className={`flex-1 py-2.5 rounded-xl transition-colors text-sm ${
              activeTab === "created"
                ? "bg-white text-blue-600"
                : "bg-white/20 text-white"
            }`}
          >
            Created
          </button>
          <button
            onClick={() => setActiveTab("downloaded")}
            className={`flex-1 py-2.5 rounded-xl transition-colors text-sm ${
              activeTab === "downloaded"
                ? "bg-white text-blue-600"
                : "bg-white/20 text-white"
            }`}
          >
            Downloaded
          </button>
          <button
            onClick={() => setActiveTab("phone")}
            className={`flex-1 py-2.5 rounded-xl transition-colors text-sm ${
              activeTab === "phone"
                ? "bg-white text-blue-600"
                : "bg-white/20 text-white"
            }`}
          >
            Phone Files
          </button>
        </div>
      </div>

      <div className="p-4 pb-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {getCurrentList().map((item) => {
          const isSelected = selectedQuizzes.includes(item.id);
          const isPhoneFile = activeTab === "phone";

          return (
            <div
              key={item.id}
              onClick={() => toggleQuiz(item.id)}
              className={`bg-white rounded-2xl p-4 cursor-pointer transition-all ${
                isSelected ? "ring-2 ring-blue-500 shadow-lg" : "shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {isPhoneFile && <FileText className="w-5 h-5 text-gray-400" />}
                    <h3 className="text-gray-900">{item.title}</h3>
                  </div>
                  <div className="flex gap-3 text-sm text-gray-600">
                    {isPhoneFile ? (
                      <>
                        <span>{(item as any).type}</span>
                        <span>•</span>
                        <span>{(item as any).size}</span>
                      </>
                    ) : (
                      <>
                        <span>{(item as any).subject}</span>
                        <span>•</span>
                        <span>{(item as any).questions} questions</span>
                      </>
                    )}
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelected
                    ? "bg-blue-500 border-blue-500"
                    : "border-gray-300"
                }`}>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-white" />}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {selectedQuizzes.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700">{selectedQuizzes.length} selected</span>
              <button
                onClick={() => setSelectedQuizzes([])}
                className="text-blue-600 text-sm"
              >
                Clear
              </button>
            </div>
            <button
              onClick={() => navigate("/offline-sharing")}
              className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share {selectedQuizzes.length} {selectedQuizzes.length === 1 ? 'item' : 'items'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
