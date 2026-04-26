import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Clock, CheckCircle2 } from "lucide-react";

export function QuizTakingScreen() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(45);

  const questions = [
    {
      question: "What is the slope-intercept form of a linear equation?",
      options: [
        "y = mx + b",
        "ax² + bx + c = 0",
        "y = a(x - h)² + k",
        "x = -b/2a"
      ]
    },
    {
      question: "Solve for x: 2x + 5 = 15",
      options: ["x = 5", "x = 10", "x = 7.5", "x = 20"]
    }
  ];

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate("/home")} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex items-center gap-2 bg-orange-100 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4 text-orange-600" />
            <span className="text-sm text-orange-600">{timeRemaining}s</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Question {currentQuestion + 1} of {totalQuestions}</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h2 className="text-xl text-gray-900 leading-relaxed">
            {questions[currentQuestion].question}
          </h2>
        </div>

        <div className="space-y-3">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              className={`w-full p-4 rounded-2xl text-left transition-all ${
                selectedAnswer === index
                  ? "bg-blue-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-800 hover:bg-gray-50 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {selectedAnswer === index && (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white border-t border-gray-200">
        <button
          onClick={() => {
            if (currentQuestion < totalQuestions - 1) {
              setCurrentQuestion(currentQuestion + 1);
              setSelectedAnswer(null);
            } else {
              navigate("/home");
            }
          }}
          disabled={selectedAnswer === null}
          className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
        >
          {currentQuestion < totalQuestions - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
}
