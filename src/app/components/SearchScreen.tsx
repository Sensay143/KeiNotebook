import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, ChevronLeft, SlidersHorizontal } from "lucide-react";
import { QuizCard } from "./QuizCard";

export function SearchScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [publicFilter, setPublicFilter] = useState(true);
  const [anonymousFilter, setAnonymousFilter] = useState(true);
  const [offlineFilter, setOfflineFilter] = useState(false);
  const [subject, setSubject] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  const allQuizzes = [
    {
      id: "1",
      title: "Algebra Fundamentals",
      subject: "Math",
      creator: "Sarah Chen",
      visibility: "public" as const,
      downloaded: true,
    },
    {
      id: "2",
      title: "Physics: Motion & Forces",
      subject: "Science",
      creator: "Anonymous",
      visibility: "anonymous" as const,
      bluetoothReceived: true,
    },
    {
      id: "3",
      title: "Advanced Calculus",
      subject: "Math",
      creator: "Private Quiz",
      visibility: "private" as const,
    },
    {
      id: "4",
      title: "World War II Events",
      subject: "History",
      creator: "Prof. Johnson",
      visibility: "public" as const,
    },
    {
      id: "5",
      title: "Spanish Vocabulary",
      subject: "Languages",
      creator: "Maria Rodriguez",
      visibility: "public" as const,
      downloaded: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/home")} className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quizzes..."
              className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">Filters</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() => setPublicFilter(!publicFilter)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              publicFilter
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Public
          </button>
          <button
            onClick={() => setAnonymousFilter(!anonymousFilter)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              anonymousFilter
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Anonymous
          </button>
          <button
            onClick={() => setOfflineFilter(!offlineFilter)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              offlineFilter
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Offline Only
          </button>
        </div>

        <div className="flex gap-2">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Subjects</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="languages">Languages</option>
          </select>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="all">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {allQuizzes && allQuizzes.length > 0 ? (
          allQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              title={quiz.title}
              subject={quiz.subject}
              creator={quiz.creator}
              visibility={quiz.visibility}
              downloaded={quiz.downloaded}
              bluetoothReceived={quiz.bluetoothReceived}
              onClick={() =>
                quiz.visibility === "private"
                  ? navigate(`/private-access/${quiz.id}`)
                  : navigate(`/quiz/${quiz.id}`)
              }
            />
          ))
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center">
            <p className="text-gray-500">No quizzes found</p>
            <p className="text-sm text-gray-400 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
