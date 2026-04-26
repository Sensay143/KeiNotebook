import { useNavigate } from "react-router";
import { ChevronLeft, Download as DownloadIcon, Trash2 } from "lucide-react";
import { QuizCard } from "./QuizCard";

export function DownloadedQuizzesScreen() {
  const navigate = useNavigate();

  const downloadedQuizzes = [
    {
      id: "1",
      title: "Algebra Fundamentals",
      subject: "Math",
      creator: "Sarah Chen",
      visibility: "public" as const,
      downloaded: true,
      downloadedDate: "2 days ago",
      size: "2.3 MB"
    },
    {
      id: "5",
      title: "Spanish Vocabulary",
      subject: "Languages",
      creator: "Maria Rodriguez",
      visibility: "public" as const,
      downloaded: true,
      downloadedDate: "1 week ago",
      size: "1.8 MB"
    },
    {
      id: "2",
      title: "Physics: Motion & Forces",
      subject: "Science",
      creator: "Anonymous",
      visibility: "anonymous" as const,
      downloaded: true,
      bluetoothReceived: true,
      downloadedDate: "3 days ago",
      size: "3.1 MB"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-500 to-green-400 p-4 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate("/home")} className="p-2 hover:bg-white/20 rounded-full">
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl text-white">Downloaded Quizzes</h1>
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm opacity-80">Total Downloads</p>
              <p className="text-2xl">{downloadedQuizzes.length}</p>
            </div>
            <DownloadIcon className="w-10 h-10 opacity-80" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {downloadedQuizzes && downloadedQuizzes.length > 0 ? (
          downloadedQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div onClick={() => navigate(`/quiz/${quiz.id}`)} className="cursor-pointer">
                <QuizCard
                  title={quiz.title}
                  subject={quiz.subject}
                  creator={quiz.creator}
                  visibility={quiz.visibility}
                  downloaded={quiz.downloaded}
                  bluetoothReceived={quiz.bluetoothReceived}
                />
              </div>
              <div className="px-4 pb-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <div className="text-sm text-gray-500">
                  <p>{quiz.downloadedDate} • {quiz.size}</p>
                </div>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center">
            <DownloadIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No downloaded quizzes</p>
            <p className="text-sm text-gray-400">Download quizzes to access them offline</p>
          </div>
        )}
      </div>
    </div>
  );
}
