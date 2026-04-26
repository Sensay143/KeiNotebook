import { useNavigate } from "react-router";
import { Download, Share2, Plus, Globe, Radio, BookOpen, Trophy, User, Users as UsersIcon, MessageCircle } from "lucide-react";
import { QuizCard } from "./QuizCard";
import { useAuth } from "../context/AuthContext";

export function HomeScreen() {
  const navigate = useNavigate();
  const { isGuest } = useAuth();
  const isOnline = true;

  const offlineQuizzes = [
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
  ];

  const trendingQuizzes = [
    {
      id: "3",
      title: "World War II Events",
      subject: "History",
      creator: "Prof. Johnson",
      visibility: "public" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24 relative">
      <div className="bg-gradient-to-r from-blue-500 to-green-400 p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-white">K.E.I Notebook</h1>
          <div className="flex items-center gap-2">
            {isGuest && (
              <button
                onClick={() => navigate("/auth")}
                className="px-4 py-1.5 bg-white text-blue-600 rounded-full text-sm hover:bg-white/90 transition-colors"
              >
                Sign In
              </button>
            )}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {isOnline ? (
                <>
                  <Globe className="w-4 h-4 text-white" />
                  <span className="text-sm text-white">Online</span>
                </>
              ) : (
                <>
                  <Radio className="w-4 h-4 text-white" />
                  <span className="text-sm text-white">Offline</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div
          onClick={() => navigate("/your-notebook")}
          className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-md cursor-pointer"
        >
          <BookOpen className="w-5 h-5 text-gray-400" />
          <span className="text-gray-400">Your Notebook</span>
        </div>
      </div>

      <div className="px-6 py-6 space-y-8">
        <div className="grid grid-cols-3 sm:flex sm:justify-center gap-3 sm:gap-6">
          <button
            onClick={() => navigate("/downloaded")}
            className="bg-white p-4 sm:px-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2 flex-1 max-w-[200px]"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700">Downloads</span>
          </button>
          <button
            onClick={() => navigate("/share-quizzes")}
            className="bg-white p-4 sm:px-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2 flex-1 max-w-[200px]"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Share2 className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700">Share</span>
          </button>
          <button
            onClick={() => navigate("/create")}
            className="bg-white p-4 sm:px-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center gap-2 flex-1 max-w-[200px]"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-xs sm:text-sm text-gray-700">Create</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:justify-center gap-3 sm:gap-6">
          <button
            onClick={() => navigate("/community")}
            className="bg-gradient-to-br from-blue-500 to-purple-500 p-4 sm:px-8 sm:py-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex items-center gap-3 flex-1 max-w-[300px]"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-sm sm:text-base text-white block font-medium">Community</span>
              <span className="text-xs sm:text-sm text-white/80">Discussions</span>
            </div>
          </button>
          <button
            onClick={() => navigate("/community-rooms")}
            className="bg-gradient-to-br from-purple-500 to-pink-500 p-4 sm:px-8 sm:py-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex items-center gap-3 flex-1 max-w-[300px]"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0">
              <UsersIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-sm sm:text-base text-white block font-medium">Study Rooms</span>
              <span className="text-xs sm:text-sm text-white/80">Join live</span>
            </div>
          </button>
        </div>

        <div>
          <h2 className="text-lg mb-3 text-gray-800">Available Offline</h2>
          {offlineQuizzes && offlineQuizzes.length > 0 ? (
            <div className="space-y-3">
              {offlineQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  title={quiz.title}
                  subject={quiz.subject}
                  creator={quiz.creator}
                  visibility={quiz.visibility}
                  downloaded={quiz.downloaded}
                  bluetoothReceived={quiz.bluetoothReceived}
                  onClick={() => navigate(`/quiz/${quiz.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 text-center text-gray-500">
              <p>No offline quizzes available</p>
            </div>
          )}
        </div>

        {isOnline && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-5 h-5 text-orange-500" />
              <h2 className="text-lg text-gray-800">Trending</h2>
            </div>
            {trendingQuizzes && trendingQuizzes.length > 0 ? (
              <div className="space-y-3">
                {trendingQuizzes.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    title={quiz.title}
                    subject={quiz.subject}
                    creator={quiz.creator}
                    visibility={quiz.visibility}
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 text-center text-gray-500">
                <p>No trending quizzes at the moment</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-6 py-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-around sm:justify-center sm:gap-24 md:gap-32">
          <button className="flex flex-col items-center gap-1 text-blue-600">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => navigate("/community-materials")}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Download className="w-6 h-6" />
            <span className="text-xs">Materials</span>
          </button>
          <button
            onClick={() => navigate("/create-notebook")}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Plus className="w-6 h-6" />
            <span className="text-xs">Create</span>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
