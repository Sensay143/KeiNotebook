import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Edit, Upload, FileText, Presentation, Layers } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function CreateNotebookScreen() {
  const navigate = useNavigate();
  const { isGuest } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 to-green-400 p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/home")} className="p-2 hover:bg-white/20 rounded-full">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl text-white">Create Notebook</h1>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-xl text-gray-800 mb-2">What would you like to create?</h2>
          <p className="text-sm text-gray-600">Choose your content type</p>
        </div>

        <button
          onClick={() => navigate("/create-quiz")}
          className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Edit className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg text-gray-900 mb-1">Create Quiz</h3>
              <p className="text-sm text-gray-600">Multiple choice, identification, or essay questions</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate("/create-study-material")}
          className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Layers className="w-8 h-8 text-purple-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg text-gray-900 mb-1">Create Study Material</h3>
              <p className="text-sm text-gray-600">Flashcards, notes, and study guides</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => navigate("/upload-material")}
          className="w-full bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg text-gray-900 mb-1">Upload File</h3>
              <p className="text-sm text-gray-600">Upload PDF or presentation and convert</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
