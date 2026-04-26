import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Download, Star, BookOpen, Layers, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function CommunityMaterialsScreen() {
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const [activeTab, setActiveTab] = useState<"quizzes" | "materials">("quizzes");
  const [searchQuery, setSearchQuery] = useState("");

  const communityQuizzes = [
    { id: "1", title: "Advanced Calculus", author: "Sarah Chen", subject: "Logic", downloads: 456, stars: 89, questions: 20 },
    { id: "2", title: "Python Programming", author: "Mike Johnson", subject: "Programming", downloads: 892, stars: 145, questions: 30 },
    { id: "3", title: "Cognitive Psychology", author: "Emma Wilson", subject: "Psychology", downloads: 234, stars: 67, questions: 15 },
  ];

  const communityMaterials = [
    { id: "1", title: "JavaScript Flashcards", author: "Alex Brown", type: "Flashcards", subject: "Programming", downloads: 567, stars: 123 },
    { id: "2", title: "Biology Study Guide", author: "Lisa Wang", type: "Notes", subject: "Biological", downloads: 345, stars: 78 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/home")} className="p-2 hover:bg-white/20 rounded-full">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl text-white">Community Materials</h1>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search materials..."
            className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm text-white placeholder:text-white/60 rounded-2xl outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`px-6 py-2.5 rounded-xl transition-colors ${
              activeTab === "quizzes"
                ? "bg-white text-green-600"
                : "bg-white/20 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Quizzes
            </div>
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-6 py-2.5 rounded-xl transition-colors ${
              activeTab === "materials"
                ? "bg-white text-green-600"
                : "bg-white/20 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Study Materials
            </div>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {isGuest && (
          <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4">
            <p className="text-orange-900 text-sm">
              <strong>Guest Mode:</strong> Create an account to download materials to your notebook.
            </p>
          </div>
        )}

        {activeTab === "quizzes" ? (
          communityQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-1">{quiz.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {quiz.author}</p>
                  <div className="flex gap-3 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {quiz.subject}
                    </span>
                    <span>{quiz.questions} questions</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {quiz.stars}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                  className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm"
                >
                  Preview
                </button>
                <button
                  disabled={isGuest}
                  className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
                    isGuest
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  {quiz.downloads}
                </button>
              </div>
            </div>
          ))
        ) : (
          communityMaterials.map((material) => (
            <div
              key={material.id}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-1">{material.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">by {material.author}</p>
                  <div className="flex gap-3 text-sm text-gray-600">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                      {material.type}
                    </span>
                    <span>{material.subject}</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      {material.stars}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors text-sm">
                  Preview
                </button>
                <button
                  disabled={isGuest}
                  className={`px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
                    isGuest
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  <Download className="w-4 h-4" />
                  {material.downloads}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
