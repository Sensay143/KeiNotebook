import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Clock, CheckCircle2 } from "lucide-react";

export function QuizTakingScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(45);
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/quizzes");
        const data = await response.json();
        
        const currentQuiz = data.find((q: any) => q.id === Number(id));
        
        if (currentQuiz && currentQuiz.content) {
          setQuestions(JSON.parse(currentQuiz.content));
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  if (isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-xl text-gray-800 mb-4">No questions found in this quiz!</h2>
        <button onClick={() => navigate("/home")} className="px-6 py-3 bg-blue-500 text-white rounded-xl">
          Go Back
        </button>
      </div>
    );
  }

  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentQData = questions[currentQuestion];

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
            {currentQData.question}
          </h2>
        </div>

        {currentQData.type === "multiple-choice" && (
          <div className="space-y-3">
            {currentQData.options?.map((option: string, index: number) => (
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
        )}
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
          disabled={selectedAnswer === null && currentQData.type === "multiple-choice"}
          className="w-full bg-gradient-to-r from-blue-500 to-green-400 text-white py-4 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-shadow"
        >
          {currentQuestion < totalQuestions - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
}