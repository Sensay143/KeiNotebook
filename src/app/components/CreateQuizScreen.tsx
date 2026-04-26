import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Plus, Trash2, Lock, QrCode, Share2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

type QuestionType = "multiple-choice" | "identification" | "essay";

interface Question {
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: number | string;
}

export function CreateQuizScreen() {
  const navigate = useNavigate();
  const { user, isGuest, addPrivateQuizPin } = useAuth();
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [customSubject, setCustomSubject] = useState("");
  const [visibility, setVisibility] = useState<"public" | "anonymous" | "private">("public");
  const [passcode, setPasscode] = useState("");
  const [showQR, setShowQR] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    { type: "multiple-choice", question: "", options: ["", "", "", ""], correctAnswer: 0 }
  ]);

  const addQuestion = (type: QuestionType = "multiple-choice") => {
    const newQuestion: Question = {
      type,
      question: "",
      options: type === "multiple-choice" ? ["", "", "", ""] : [],
      correctAnswer: type === "multiple-choice" ? 0 : ""
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestionType = (index: number, type: QuestionType) => {
    const newQuestions = [...questions];
    newQuestions[index] = {
      type,
      question: newQuestions[index].question,
      options: type === "multiple-choice" ? ["", "", "", ""] : [],
      correctAnswer: type === "multiple-choice" ? 0 : ""
    };
    setQuestions(newQuestions);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 max-w-md lg:max-w-full mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-green-400 p-4 lg:p-6 shadow-lg">
        <div className="lg:max-w-6xl lg:mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/create-notebook")} className="p-2 hover:bg-white/20 rounded-full transition-colors">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-xl lg:text-2xl text-white">Create Quiz</h1>
              <p className="text-sm text-white/80 hidden lg:block">Build your quiz with multiple question types</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-8 space-y-4 lg:max-w-6xl lg:mx-auto">
        <div className="lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm lg:col-span-2">
            <label className="text-sm text-gray-600 mb-2 block">Quiz Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter quiz title..."
              className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            <label className="text-sm text-gray-600 mb-2 block">Subject Category</label>
            <select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                if (e.target.value !== "custom") setCustomSubject("");
              }}
              className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select subject...</option>
              <option value="logic">Logic</option>
              <option value="programming">Programming</option>
              <option value="psychology">Psychology</option>
              <option value="biological">Biological</option>
              <option value="aerospace">Aerospace</option>
              <option value="others">Others</option>
              <option value="custom">Type your own...</option>
            </select>
            {subject === "custom" && (
              <input
                type="text"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
                placeholder="Enter custom subject..."
                className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0 space-y-4">
          {isGuest && (
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-4 flex gap-3 lg:col-span-2">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-orange-900">Guest Mode</p>
                <p className="text-xs text-orange-700 mt-1">
                  You can only share quizzes offline. Create an account to upload publicly.
                </p>
              </div>
            </div>
          )}

          {!isGuest && (
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <label className="text-sm text-gray-600 mb-3 block">Visibility</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setVisibility("public")}
                  className={`flex-1 py-2.5 rounded-xl text-sm transition-colors ${
                    visibility === "public"
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Public
                </button>
                <button
                  onClick={() => setVisibility("anonymous")}
                  className={`flex-1 py-2.5 rounded-xl text-sm transition-colors ${
                    visibility === "anonymous"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  Anonymous
                </button>
                <button
                  onClick={() => setVisibility("private")}
                  className={`flex-1 py-2.5 rounded-xl text-sm transition-colors ${
                    visibility === "private"
                      ? "bg-purple-500 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <Lock className="w-4 h-4" />
                    Private
                  </div>
                </button>
              </div>
            </div>
          )}

          {!isGuest && visibility === "private" && (
            <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Passcode</label>
                <input
                  type="text"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter 4-digit passcode..."
                  maxLength={4}
                  className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                onClick={() => setShowQR(!showQR)}
                className="flex items-center gap-2 text-purple-600 text-sm"
              >
                <QrCode className="w-4 h-4" />
                {showQR ? "Hide QR Code" : "Generate QR Code"}
              </button>
              {showQR && (
                <div className="bg-gray-100 p-6 rounded-xl flex items-center justify-center">
                  <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center">
                    <QrCode className="w-24 h-24 text-gray-400" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3 lg:col-span-3">
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm">
            <h2 className="text-lg lg:text-xl text-gray-800">Questions</h2>
            <button
              onClick={() => addQuestion("multiple-choice")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Question
            </button>
          </div>

          <div className="lg:grid lg:grid-cols-2 lg:gap-4 space-y-3 lg:space-y-0">
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Question {qIndex + 1}</span>
                <div className="flex items-center gap-2">
                  <select
                    value={q.type}
                    onChange={(e) => updateQuestionType(qIndex, e.target.value as QuestionType)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm outline-none"
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="identification">Identification</option>
                    <option value="essay">Essay</option>
                  </select>
                  {questions.length > 1 && (
                    <button
                      onClick={() => removeQuestion(qIndex)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <input
                type="text"
                value={q.question}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[qIndex].question = e.target.value;
                  setQuestions(newQuestions);
                }}
                placeholder="Enter question..."
                className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              {q.type === "multiple-choice" && (
                <div className="space-y-2">
                  <label className="text-xs text-gray-500">Options:</label>
                  {q.options.map((option, oIndex) => (
                    <input
                      key={oIndex}
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const newQuestions = [...questions];
                        newQuestions[qIndex].options[oIndex] = e.target.value;
                        setQuestions(newQuestions);
                      }}
                      placeholder={`Option ${oIndex + 1}`}
                      className="w-full px-4 py-2 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  ))}
                </div>
              )}

              {q.type === "identification" && (
                <div>
                  <label className="text-xs text-gray-500 block mb-2">Correct Answer:</label>
                  <input
                    type="text"
                    value={q.correctAnswer as string}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[qIndex].correctAnswer = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    placeholder="Enter correct answer..."
                    className="w-full px-4 py-2 bg-green-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500 text-sm"
                  />
                </div>
              )}

              {q.type === "essay" && (
                <div className="bg-purple-50 p-3 rounded-xl">
                  <p className="text-xs text-purple-700">Essay questions will be graded manually</p>
                </div>
              )}
            </div>
          ))}
          </div>
        </div>

        <div className="lg:col-span-3 flex gap-3 pt-4 bg-white lg:bg-transparent p-4 lg:p-0 lg:sticky lg:bottom-8">
          <button
            onClick={() => {
              if (!isGuest && visibility === "private" && passcode && title) {
                addPrivateQuizPin({ id: Date.now().toString(), title, pin: passcode });
              }
              navigate("/home");
            }}
            className="flex-1 bg-white text-gray-700 py-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            {isGuest ? "Save Locally" : "Save & Upload"}
          </button>
          <button
            onClick={() => navigate("/offline-sharing")}
            className="flex-1 bg-gradient-to-r from-blue-500 to-green-400 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Offline
          </button>
        </div>
      </div>
    </div>
  );
}
