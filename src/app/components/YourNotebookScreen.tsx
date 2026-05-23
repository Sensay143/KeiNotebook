import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, BookOpen, Layers, Download, Edit, Trash2, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// 1. Define your data types
interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: number;
  downloads: number;
}

interface Material {
  id: string;
  title: string;
  type: string;
  subject: string;
  cards?: number;
  pages?: number;
}

export function YourNotebookScreen() {
  const navigate = useNavigate();
  const { user, isGuest } = useAuth();
  const [activeTab, setActiveTab] = useState<"quizzes" | "materials">("quizzes");
  
  // 2. Replace static arrays with state
  const [myQuizzes, setMyQuizzes] = useState<Quiz[]>([]);
  const [myMaterials, setMyMaterials] = useState<Material[]>([]);

  const [editingQuiz, setEditingQuiz] = useState<string | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<string | null>(null);

  // Temporary state to hold form data while editing
  const [editFormData, setEditFormData] = useState<any>({});

  // 3. Load data from localStorage on component mount
  useEffect(() => {
    const savedQuizzes = localStorage.getItem("notebook_quizzes");
    const savedMaterials = localStorage.getItem("notebook_materials");

    if (savedQuizzes) {
      setMyQuizzes(JSON.parse(savedQuizzes));
    } else {
      // Fallback default data if empty (optional)
      setMyQuizzes([
        { id: "1", title: "Algebra Fundamentals", subject: "Logic", questions: 10, downloads: 234 },
        { id: "2", title: "Data Structures", subject: "Programming", questions: 15, downloads: 128 },
      ]);
    }

    if (savedMaterials) {
      setMyMaterials(JSON.parse(savedMaterials));
    } else {
      setMyMaterials([
        { id: "1", title: "Python Basics Flashcards", type: "Flashcards", subject: "Programming", cards: 25 },
        { id: "2", title: "Psychology Study Notes", type: "Notes", subject: "Psychology", pages: 8 },
      ]);
    }
  }, []);

  // 4. Helper functions to update state AND localStorage simultaneously
  const saveQuizzes = (updatedQuizzes: Quiz[]) => {
    setMyQuizzes(updatedQuizzes);
    localStorage.setItem("notebook_quizzes", JSON.stringify(updatedQuizzes));
  };

  const saveMaterials = (updatedMaterials: Material[]) => {
    setMyMaterials(updatedMaterials);
    localStorage.setItem("notebook_materials", JSON.stringify(updatedMaterials));
  };

  // 5. Delete Handlers
  const handleDeleteQuiz = (id: string) => {
    saveQuizzes(myQuizzes.filter((q) => q.id !== id));
  };

  const handleDeleteMaterial = (id: string) => {
    saveMaterials(myMaterials.filter((m) => m.id !== id));
  };

  // 6. Edit Handlers
  const startEditingQuiz = (quiz: Quiz) => {
    setEditingQuiz(quiz.id);
    setEditFormData({ title: quiz.title, subject: quiz.subject });
  };

  const saveEditedQuiz = (id: string) => {
    const updated = myQuizzes.map((q) =>
      q.id === id ? { ...q, title: editFormData.title, subject: editFormData.subject } : q
    );
    saveQuizzes(updated);
    setEditingQuiz(null);
  };

  const startEditingMaterial = (material: Material) => {
    setEditingMaterial(material.id);
    setEditFormData({ title: material.title, subject: material.subject, type: material.type });
  };

  const saveEditedMaterial = (id: string) => {
    const updated = myMaterials.map((m) =>
      m.id === id ? { ...m, title: editFormData.title, subject: editFormData.subject, type: editFormData.type } : m
    );
    saveMaterials(updated);
    setEditingMaterial(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate("/home")} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-2xl text-white">Your Notebook</h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`px-6 py-2.5 rounded-xl transition-colors ${
              activeTab === "quizzes" ? "bg-white text-blue-600" : "bg-white/20 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Quizzes
            </div>
          </button>
          <button
            onClick={() => setActiveTab("materials")}
            className={`px-6 py-2.5 rounded-xl transition-colors ${
              activeTab === "materials" ? "bg-white text-blue-600" : "bg-white/20 text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4" /> Study Materials
            </div>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {activeTab === "quizzes" ? (
          myQuizzes.length > 0 ? (
            myQuizzes.map((quiz) => (
              <div key={quiz.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
                {editingQuiz === quiz.id ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm text-gray-600">Editing Quiz</h3>
                      <button onClick={() => setEditingQuiz(null)} className="p-1 hover:bg-gray-100 rounded">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={editFormData.title}
                      onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                      placeholder="Quiz title..."
                      className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                      value={editFormData.subject.toLowerCase()}
                      onChange={(e) => setEditFormData({ ...editFormData, subject: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="logic">Logic</option>
                      <option value="programming">Programming</option>
                      <option value="psychology">Psychology</option>
                      <option value="biological">Biological</option>
                      <option value="aerospace">Aerospace</option>
                      <option value="others">Others</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEditedQuiz(quiz.id)}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingQuiz(null)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg text-gray-900 mb-1">{quiz.title}</h3>
                        <div className="flex gap-3 text-sm text-gray-600">
                          <span className="capitalize">{quiz.subject}</span>
                          <span>•</span>
                          <span>{quiz.questions} questions</span>
                          <span>•</span>
                          <span><Download className="w-3 h-3 inline" /> {quiz.downloads}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/quiz/${quiz.id}`)}
                        className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm"
                      >
                        View
                      </button>
                      <button
                        onClick={() => startEditingQuiz(quiz)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteQuiz(quiz.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No quizzes yet</p>
              <button onClick={() => navigate("/create-notebook")} className="text-blue-600 text-sm hover:underline">
                Create your first quiz
              </button>
            </div>
          )
        ) : myMaterials.length > 0 ? (
          myMaterials.map((material) => (
            <div key={material.id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
              {editingMaterial === material.id ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm text-gray-600">Editing Study Material</h3>
                    <button onClick={() => setEditingMaterial(null)} className="p-1 hover:bg-gray-100 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    placeholder="Material title..."
                    className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <select
                    value={editFormData.subject.toLowerCase()}
                    onChange={(e) => setEditFormData({ ...editFormData, subject: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="logic">Logic</option>
                    <option value="programming">Programming</option>
                    <option value="psychology">Psychology</option>
                    <option value="biological">Biological</option>
                    <option value="aerospace">Aerospace</option>
                    <option value="others">Others</option>
                  </select>
                  <select
                    value={editFormData.type.toLowerCase()}
                    onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="flashcards">Flashcards</option>
                    <option value="notes">Notes</option>
                    <option value="summary">Summary</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEditedMaterial(material.id)}
                      className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors text-sm"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingMaterial(null)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg text-gray-900 mb-1">{material.title}</h3>
                      <div className="flex gap-3 text-sm text-gray-600">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs capitalize">
                          {material.type}
                        </span>
                        <span className="capitalize">{material.subject}</span>
                        <span>•</span>
                        <span>{material.cards ? `${material.cards} cards` : `${material.pages} pages`}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors text-sm">
                      Study
                    </button>
                    <button
                      onClick={() => startEditingMaterial(material)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteMaterial(material.id)}
                      className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center">
            <Layers className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No study materials yet</p>
            <button onClick={() => navigate("/create-notebook")} className="text-purple-600 text-sm hover:underline">
              Create your first study material
            </button>
          </div>
        )}
      </div>
    </div>
  );
}